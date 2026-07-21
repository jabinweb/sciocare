import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { canAccessClass, canAccessSubject, isPricingEnabled } from '@/lib/lms-access';
import { getSessionUserId } from '@/lib/session';

export async function GET() {
  try {
    const userId = await getSessionUserId();

    if (!userId) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { school: true },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const allClasses = await prisma.class.findMany({
      where: {
        isActive: true,
        hideFromStudents: false,
      },
      include: {
        subjects: {
          include: {
            chapters: {
              include: {
                topics: {
                  select: {
                    id: true,
                    name: true,
                    type: true,
                    duration: true,
                    description: true,
                    orderIndex: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: { id: 'asc' },
    });

    const pricingEnabled = await isPricingEnabled();

    const classesWithAccess = await Promise.all(
      allClasses.map(async (cls) => {
        const classAccess = await canAccessClass(userId, cls.id);

        const subjectAccessEntries = await Promise.all(
          cls.subjects.map(async (subject) => {
            const subjectAccess = await canAccessSubject(userId, cls.id, subject.id);
            return [
              subject.id,
              {
                hasAccess: subjectAccess.hasAccess,
                accessType:
                  subjectAccess.accessType === 'drip_locked'
                    ? 'drip_locked'
                    : subjectAccess.accessType === 'school'
                      ? 'school'
                      : subjectAccess.accessType === 'subject'
                        ? 'subject_subscription'
                        : subjectAccess.accessType === 'class' ||
                            subjectAccess.accessType === 'premium'
                          ? 'class_subscription'
                          : subjectAccess.accessType === 'free'
                            ? 'free'
                            : 'none',
                dripLocked: subjectAccess.accessType === 'drip_locked',
                daysRemaining: subjectAccess.daysRemaining ?? 0,
              },
            ] as const;
          })
        );

        const subjectAccess = Object.fromEntries(subjectAccessEntries);
        const hasSchoolAccess = classAccess.accessType === 'school';
        const hasClassSubscription =
          classAccess.accessType === 'class' || classAccess.accessType === 'premium';
        const hasPartialAccess =
          !hasSchoolAccess &&
          !hasClassSubscription &&
          Object.values(subjectAccess).some((entry) => entry.hasAccess);

        return {
          ...cls,
          accessType: hasSchoolAccess
            ? 'school'
            : hasClassSubscription
              ? 'subscription'
              : 'none',
          schoolAccess: hasSchoolAccess,
          subscriptionAccess: hasClassSubscription,
          subjectAccess,
          hasPartialAccess,
        };
      })
    );

    let accessType: 'subscription' | 'school' | 'free' | 'none' = 'none';
    if (!pricingEnabled || classesWithAccess.some((cls) => cls.subscriptionAccess || cls.schoolAccess)) {
      if (classesWithAccess.some((cls) => cls.subscriptionAccess)) {
        accessType = 'subscription';
      } else if (classesWithAccess.some((cls) => cls.schoolAccess)) {
        accessType = 'school';
      } else if (!pricingEnabled) {
        accessType = 'free';
      }
    }

    const accessMessage =
      accessType === 'subscription'
        ? 'Access via active subscriptions'
        : accessType === 'school'
          ? user.grade
            ? `School access for Grade ${user.grade}`
            : 'School access active'
          : accessType === 'free'
            ? 'Free access enabled'
            : 'No active access. Renew your subscription or contact your administrator.';

    return NextResponse.json({
      accessibleClasses: classesWithAccess,
      userGrade: user.grade,
      schoolName: user.school?.name,
      schoolActive: user.school?.isActive,
      accessType,
      message: accessMessage,
    });
  } catch (error) {
    console.error('Error in accessible classes API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
