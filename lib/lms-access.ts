import { prisma } from '@/lib/prisma';
import { buildDripAccessMap } from '@/lib/drip-access';
import { checkUserAccess } from '@/lib/subscription-utils';

/** Fallback grade → classId map when GRADE_CLASS_MAP setting is absent. */
const DEFAULT_GRADE_TO_CLASS_MAP: Record<string, number[]> = {
  '5': [5],
  '6': [6],
  '7': [7],
  '8': [8],
  '9': [9],
  '10': [10],
};

let cachedGradeMap: Record<string, number[]> | null = null;
let cachedGradeMapAt = 0;
const GRADE_MAP_TTL_MS = 60_000;

export type UserAccessProfile = {
  id: string;
  role?: string;
  grade?: string | null;
  school?: { isActive: boolean; name?: string } | null;
  batch?: {
    id: string;
    classId: number;
    endDate: Date | null;
    isActive?: boolean;
    isDripEnabled?: boolean;
    dripStartDate?: Date | null;
  } | null;
};

const STAFF_ROLES = new Set(['ADMIN', 'TEACHER', 'MODERATOR']);

export function isStaffUser(role: string | null | undefined): boolean {
  return !!role && STAFF_ROLES.has(role);
}

export type TopicAccessResult = {
  hasAccess: boolean;
  accessType: 'free' | 'school' | 'class' | 'subject' | 'premium' | 'none' | 'drip_locked';
  reason?: 'expired' | 'drip_locked' | 'none';
  daysRemaining?: number;
};

export function isAccessDateValid(endDate: Date | string | null | undefined): boolean {
  if (!endDate) return true;
  return new Date(endDate).getTime() > Date.now();
}

async function loadGradeToClassMap(): Promise<Record<string, number[]>> {
  const now = Date.now();
  if (cachedGradeMap && now - cachedGradeMapAt < GRADE_MAP_TTL_MS) {
    return cachedGradeMap;
  }

  try {
    const setting = await prisma.adminSettings.findUnique({
      where: { key: 'GRADE_CLASS_MAP' },
    });
    if (setting?.value) {
      const parsed = JSON.parse(setting.value) as Record<string, number[]>;
      if (parsed && typeof parsed === 'object') {
        cachedGradeMap = parsed;
        cachedGradeMapAt = now;
        return parsed;
      }
    }
  } catch (error) {
    console.error('Error loading GRADE_CLASS_MAP:', error);
  }

  cachedGradeMap = DEFAULT_GRADE_TO_CLASS_MAP;
  cachedGradeMapAt = now;
  return DEFAULT_GRADE_TO_CLASS_MAP;
}

export async function getSchoolClassIds(grade: string | null | undefined): Promise<number[]> {
  if (!grade) return [];
  const map = await loadGradeToClassMap();
  return map[grade] ?? [];
}

/** School / batch access for a class, including batch endDate enforcement. */
export async function hasSchoolAccessForClass(
  user: UserAccessProfile | null | undefined,
  classId: number
): Promise<boolean> {
  if (!user?.school?.isActive || !user.grade) return false;
  const classIds = await getSchoolClassIds(user.grade);
  if (!classIds.includes(classId)) return false;

  if (user.batch?.classId === classId) {
    if (user.batch.isActive === false) return false;
    if (user.batch.endDate) return isAccessDateValid(user.batch.endDate);
  }

  return true;
}

export async function isPricingEnabled(): Promise<boolean> {
  const setting = await prisma.adminSettings.findUnique({
    where: { key: 'ENABLE_PRICING' },
  });
  return setting?.value !== 'false';
}

export async function isGlobalAccessValid(): Promise<boolean> {
  const setting = await prisma.adminSettings.findUnique({
    where: { key: 'GLOBAL_ACCESS_VALID_TILL' },
  });
  if (!setting?.value) return true;
  return isAccessDateValid(setting.value);
}

async function loadUserAccessProfile(userId: string): Promise<UserAccessProfile | null> {
  return prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      role: true,
      grade: true,
      school: { select: { isActive: true, name: true } },
      batch: {
        select: {
          id: true,
          classId: true,
          endDate: true,
          isActive: true,
          isDripEnabled: true,
          dripStartDate: true,
        },
      },
    },
  });
}

/** Returns drip lock info for a subject when the user's batch has drip enabled. */
export async function getSubjectDripLock(
  user: UserAccessProfile | null | undefined,
  classId: number,
  subjectId: string
): Promise<{ locked: boolean; daysRemaining: number }> {
  const batch = user?.batch;
  if (!batch?.isActive || !batch.isDripEnabled || !batch.dripStartDate) {
    return { locked: false, daysRemaining: 0 };
  }

  if (batch.classId !== classId) {
    return { locked: false, daysRemaining: 0 };
  }

  const dripConfigs = await prisma.batchDripConfig.findMany({
    where: { batchId: batch.id },
    select: { subjectId: true, unlockAfterDays: true },
  });

  if (dripConfigs.length === 0) {
    return { locked: false, daysRemaining: 0 };
  }

  const dripStartDate = new Date(batch.dripStartDate);
  const dripMap = buildDripAccessMap(dripStartDate, dripConfigs);
  const dripResult = dripMap.get(subjectId);

  if (!dripResult) {
    const msPerDay = 1000 * 60 * 60 * 24;
    const daysElapsed = Math.floor((Date.now() - dripStartDate.getTime()) / msPerDay);
    const maxUnlockDay = Math.max(...dripConfigs.map((c) => c.unlockAfterDays));
    return {
      locked: true,
      daysRemaining: Math.max(1, maxUnlockDay - daysElapsed),
    };
  }

  if (dripResult.isUnlocked) {
    return { locked: false, daysRemaining: 0 };
  }

  return { locked: true, daysRemaining: dripResult.daysRemaining };
}

export async function canAccessClass(
  userId: string,
  classId: number
): Promise<{
  hasAccess: boolean;
  accessType: 'free' | 'school' | 'class' | 'subject' | 'premium' | 'none';
  subscription?: unknown;
}> {
  const user = await loadUserAccessProfile(userId);
  if (!user) return { hasAccess: false, accessType: 'none' };

  if (isStaffUser(user.role)) {
    return { hasAccess: true, accessType: 'free' };
  }

  if (!(await isPricingEnabled())) {
    if (!(await isGlobalAccessValid())) {
      return { hasAccess: false, accessType: 'none' };
    }
    return { hasAccess: true, accessType: 'free' };
  }

  if (await hasSchoolAccessForClass(user, classId)) {
    return { hasAccess: true, accessType: 'school' };
  }

  // Batch membership alone grants class access when the batch targets this class.
  if (
    user.batch?.isActive !== false &&
    user.batch?.classId === classId &&
    isAccessDateValid(user.batch.endDate)
  ) {
    return { hasAccess: true, accessType: 'school' };
  }

  const classAccess = await checkUserAccess(userId, classId);
  if (classAccess.hasClassAccess || classAccess.accessType === 'premium') {
    return {
      hasAccess: true,
      accessType: classAccess.accessType,
      subscription: classAccess.subscription,
    };
  }

  return { hasAccess: false, accessType: 'none', subscription: classAccess.subscription };
}

export async function canAccessSubject(
  userId: string,
  classId: number,
  subjectId: string,
  options?: { skipDripCheck?: boolean }
): Promise<TopicAccessResult & { subscription?: unknown }> {
  const user = await loadUserAccessProfile(userId);
  if (!user) return { hasAccess: false, accessType: 'none', reason: 'none' };

  if (isStaffUser(user.role)) {
    return { hasAccess: true, accessType: 'free' };
  }

  const pricingEnabled = await isPricingEnabled();
  const subscriptionAccess = await checkUserAccess(userId, classId, subjectId);
  const hasPaidAccess =
    subscriptionAccess.hasClassAccess ||
    subscriptionAccess.hasSubjectAccess ||
    subscriptionAccess.accessType === 'premium';

  // Drip pacing applies to school/batch learners — paid subscribers get immediate access.
  if (!options?.skipDripCheck && !hasPaidAccess) {
    const drip = await getSubjectDripLock(user, classId, subjectId);
    if (drip.locked) {
      return {
        hasAccess: false,
        accessType: 'drip_locked',
        reason: 'drip_locked',
        daysRemaining: drip.daysRemaining,
      };
    }
  }

  if (!pricingEnabled) {
    if (!(await isGlobalAccessValid())) {
      return { hasAccess: false, accessType: 'none', reason: 'expired' };
    }
    return { hasAccess: true, accessType: 'free' };
  }

  if (await hasSchoolAccessForClass(user, classId)) {
    return { hasAccess: true, accessType: 'school' };
  }

  if (
    user.batch?.isActive !== false &&
    user.batch?.classId === classId &&
    isAccessDateValid(user.batch.endDate)
  ) {
    return { hasAccess: true, accessType: 'school' };
  }

  if (hasPaidAccess) {
    return {
      hasAccess: true,
      accessType: subscriptionAccess.accessType,
      subscription: subscriptionAccess.subscription,
    };
  }

  return { hasAccess: false, accessType: 'none', reason: 'expired' };
}

/** Resolve a topic and enforce subscription, batch, and drip access. */
export async function canAccessTopic(
  userId: string,
  topicId: string
): Promise<TopicAccessResult & { classId?: number; subjectId?: string }> {
  const topic = await prisma.topic.findUnique({
    where: { id: topicId },
    select: {
      chapter: {
        select: {
          subject: {
            select: { id: true, classId: true },
          },
        },
      },
    },
  });

  if (!topic) {
    return { hasAccess: false, accessType: 'none', reason: 'none' };
  }

  const classId = topic.chapter.subject.classId;
  const subjectId = topic.chapter.subject.id;
  const access = await canAccessSubject(userId, classId, subjectId);

  return { ...access, classId, subjectId };
}
