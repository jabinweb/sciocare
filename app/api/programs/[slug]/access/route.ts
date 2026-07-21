import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { canAccessSubject } from '@/lib/lms-access';
import { getSessionUserId } from '@/lib/session';

interface UnitAccess {
  id: string;
  name: string;
  hasAccess: boolean;
  accessType: 'school' | 'class_subscription' | 'subject_subscription' | 'free_trial' | 'none' | 'drip_locked';
  price?: number;
  currency?: string;
  canUpgrade?: boolean;
  accessibleChapters?: string[];
  dripLocked?: boolean;
  daysRemaining?: number;
}

interface DbSubject {
  id: string;
  name: string;
  icon: string;
  color: string;
  orderIndex: number;
  price: number | null;
  currency: string;
  chapters: Array<{
    id: string;
    name: string;
    orderIndex: number;
  }>;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const userId = await getSessionUserId();
    const { slug } = await params;

    if (!userId) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    if (!slug) {
      return NextResponse.json({ error: 'Program ID is required' }, { status: 400 });
    }

    const isNumeric = /^\d+$/.test(slug);

    const programData = await prisma.class.findUnique({
      where: isNumeric
        ? { id: parseInt(slug), isActive: true }
        : { slug, isActive: true },
      include: {
        subjects: {
          select: {
            id: true,
            name: true,
            icon: true,
            color: true,
            orderIndex: true,
            price: true,
            currency: true,
            chapters: {
              select: { id: true, name: true, orderIndex: true },
              orderBy: { orderIndex: 'asc' },
            },
          },
          orderBy: { orderIndex: 'asc' },
        },
      },
    });

    if (!programData) {
      return NextResponse.json({ error: 'Program not found' }, { status: 404 });
    }

    const unitAccess: UnitAccess[] = await Promise.all(
      programData.subjects.map(async (subject: DbSubject) => {
        const allChapters = subject.chapters.map((ch) => ch.id);
        const subjectAccess = await canAccessSubject(userId, programData.id, subject.id);

        if (subjectAccess.accessType === 'drip_locked') {
          return {
            id: subject.id,
            name: subject.name,
            hasAccess: false,
            accessType: 'drip_locked' as const,
            price: subject.price || undefined,
            currency: subject.currency,
            canUpgrade: false,
            accessibleChapters: [],
            dripLocked: true,
            daysRemaining: subjectAccess.daysRemaining ?? 0,
          };
        }

        if (!subjectAccess.hasAccess) {
          return {
            id: subject.id,
            name: subject.name,
            hasAccess: false,
            accessType: 'none' as const,
            price: subject.price || undefined,
            currency: subject.currency,
            canUpgrade: true,
            accessibleChapters: [],
            dripLocked: false,
            daysRemaining: 0,
          };
        }

        const accessType =
          subjectAccess.accessType === 'school'
            ? ('school' as const)
            : subjectAccess.accessType === 'subject'
              ? ('subject_subscription' as const)
              : ('class_subscription' as const);

        return {
          id: subject.id,
          name: subject.name,
          hasAccess: true,
          accessType,
          price: subject.price || undefined,
          currency: subject.currency,
          canUpgrade: false,
          accessibleChapters: allChapters,
          dripLocked: false,
          daysRemaining: 0,
        };
      })
    );

    const hasFullAccess = unitAccess.every((unit) => unit.hasAccess);
    const isDripActive = unitAccess.some((unit) => unit.accessType === 'drip_locked');

    return NextResponse.json({
      classId: programData.id,
      className: programData.name,
      classPrice: programData.price,
      hasFullAccess,
      accessType: hasFullAccess
        ? isDripActive
          ? 'drip'
          : 'class_subscription'
        : 'none',
      unitAccess,
      canUpgradeToClass: !hasFullAccess,
      upgradeOptions: hasFullAccess ? null : { classId: programData.id },
      isDripActive,
      subscriptionDetails: null,
    });
  } catch (error) {
    console.error('Error in program access API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
