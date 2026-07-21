import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { checkUserAccess } from '@/lib/subscription-utils';
import { canAccessClass, canAccessSubject, isPricingEnabled } from '@/lib/lms-access';
import { logDashboardAccess } from '@/lib/activity-logger';

interface UserProfileWithSchool {
  id: string;
  grade?: string | null;
  school?: {
    name: string;
    isActive: boolean;
  } | null;
  batch?: {
    classId: number;
    endDate: Date | null;
  } | null;
}

interface ClassWithAccess {
  id: number;
  name: string;
  description: string;
  price?: number | null;
  schoolAccess: boolean;
  subscriptionAccess: boolean;
  hasPartialAccess: boolean;
  accessType: string;
  subjects: Array<{
    id: string;
    name: string;
    hasAccess: boolean;
    accessType: string;
  }>;
}

export async function GET() {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;

    // Get user profile with school info
    const userProfile = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        school: {
          select: {
            name: true,
            isActive: true
          }
        },
        batch: {
          select: {
            classId: true,
            endDate: true
          }
        }
      }
    });

    const isLearner = session.user.role === 'USER';

    // Get all classes with their subjects and chapters (excluding content for security)
    const classes = await prisma.class.findMany({
      where: {
        isActive: true,
        ...(isLearner ? { hideFromStudents: false } : {})
      },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        logo: true,
        isActive: true,
        price: true,
        currency: true,
        created_at: true,
        updatedAt: true,
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
                    orderIndex: true
                    // Explicitly excluding content for security
                  },
                  orderBy: { orderIndex: 'asc' }
                }
              },
              orderBy: { orderIndex: 'asc' }
            }
          },
          orderBy: { orderIndex: 'asc' }
        }
      },
      orderBy: { id: 'asc' }
    });

    const pricingEnabled = await isPricingEnabled();

    // Check access for each class
    const classesWithAccess = await Promise.all(
      classes.map(async (cls: typeof classes[number]) => {
        // Check if user has class-level access
        const classAccess = await canAccessClass(userId, cls.id);
        
        // Check subject-level access for each subject
        const subjectsWithAccess = await Promise.all(
          cls.subjects.map(async (subject: typeof cls.subjects[number]) => {
            const subjectAccess = await canAccessSubject(userId, cls.id, subject.id);
            
            return {
              ...subject,
              price: pricingEnabled ? subject.price : 0,
              hasAccess: subjectAccess.hasAccess,
              accessType: subjectAccess.accessType
            };
          })
        );

        // Determine if user has partial access (some subjects but not full class)
        const hasPartialAccess = !classAccess.hasAccess &&
          subjectsWithAccess.some((s: typeof subjectsWithAccess[number]) => s.hasAccess);

        const subscriptionAccess = await checkUserAccess(userId, cls.id);
        let validUntil = subscriptionAccess.subscription?.endDate?.toISOString() || null;
        if (userProfile?.batch?.classId === cls.id && userProfile.batch.endDate) {
          const batchEndDate = userProfile.batch.endDate.toISOString();
          if (!validUntil || new Date(batchEndDate) > new Date(validUntil)) validUntil = batchEndDate;
        }

        return {
          ...cls,
          price: pricingEnabled ? cls.price : 0,
          validUntil,
          subjects: subjectsWithAccess,
          schoolAccess: classAccess.accessType === 'school' || classAccess.accessType === 'free',
          subscriptionAccess: subscriptionAccess.hasClassAccess || classAccess.accessType === 'free',
          hasPartialAccess,
          accessType: classAccess.accessType,
          subjectAccess: subjectsWithAccess.reduce((acc: Record<string, { hasAccess: boolean; accessType: string }>, subject: typeof subjectsWithAccess[number]) => {
            acc[subject.id] = {
              hasAccess: subject.hasAccess,
              accessType: subject.accessType
            };
            return acc;
          }, {} as Record<string, { hasAccess: boolean; accessType: string }>)
        };
      })
    );

    // Log dashboard access
    await logDashboardAccess(userId);

    return NextResponse.json({
      classes: classesWithAccess,
      userProfile,
      accessMessage: generateAccessMessage(userProfile, classesWithAccess, pricingEnabled),
      accessType: determineOverallAccessType(classesWithAccess),
      isPricingEnabled: pricingEnabled
    });

  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

function generateAccessMessage(userProfile: UserProfileWithSchool | null, classes: ClassWithAccess[], pricingEnabled: boolean): string | null {
  if (!userProfile) return null;

  if (!pricingEnabled) {
    return '✓ Premium Content Unlocked: Complete learning access';
  }

  if (userProfile.school?.isActive) {
    return `✓ School Access: You have access through ${userProfile.school.name}`;
  }

  const hasAnySubscription = classes.some((c: typeof classes[number]) => c.subscriptionAccess);
  if (hasAnySubscription) {
    return `✓ Subscription Access: You have active subscriptions`;
  }

  const hasPartialAccess = classes.some((c: typeof classes[number]) => c.hasPartialAccess);
  if (hasPartialAccess) {
    return `⚡ Partial Access: You have access to some subjects`;
  }

  return null;
}

function determineOverallAccessType(classes: ClassWithAccess[]): string {
  if (classes.some((c: typeof classes[number]) => c.schoolAccess)) return 'school';
  if (classes.some((c: typeof classes[number]) => c.subscriptionAccess)) return 'subscription';
  if (classes.some((c: typeof classes[number]) => c.hasPartialAccess)) return 'partial';
  return 'individual';
}