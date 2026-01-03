import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface UnitAccess {
  id: string;
  name: string;
  hasAccess: boolean;
  accessType: 'school' | 'class_subscription' | 'subject_subscription' | 'free_trial' | 'none';
  price?: number;
  currency?: string;
  canUpgrade?: boolean;
  accessibleChapters?: string[]; // IDs of chapters user can access
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
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const { slug } = await params;

    if (!userId || !slug) {
      return NextResponse.json({ error: 'User ID and Program ID are required' }, { status: 400 });
    }

    // Get user details with school information
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        school: true
      }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Support both numeric IDs and slugs
    const isNumeric = /^\d+$/.test(slug);
    
    // Get class with subjects
    const programData = await prisma.class.findUnique({
      where: isNumeric 
        ? { id: parseInt(slug), isActive: true }
        : { slug: slug, isActive: true },
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
              select: {
                id: true,
                name: true,
                orderIndex: true
              },
              orderBy: { orderIndex: 'asc' }
            }
          },
          orderBy: { orderIndex: 'asc' }
        }
      }
    });

    if (!programData) {
      return NextResponse.json({ error: 'Program not found' }, { status: 404 });
    }

    // Check user's subscriptions
    const subscriptions = await prisma.subscription.findMany({
      where: {
        userId: userId,
        status: 'ACTIVE',
        endDate: {
          gte: new Date()
        }
      },
      select: {
        id: true,
        classId: true,
        subjectId: true,
        planType: true,
        status: true,
        startDate: true,
        endDate: true
      }
    });

    // Check for class-wide subscription
    const classSubscription = subscriptions?.find((s: typeof subscriptions[number]) => 
      s.classId === programData.id && !s.subjectId
    );

    // Check for subject-specific subscriptions
    const subjectSubscriptions = new Map(
      subscriptions?.filter((s: typeof subscriptions[number]) => s.subjectId).map((s: typeof subscriptions[number]) => [s.subjectId, s]) || []
    );

    // Check school access
    const gradeToClassMap: Record<string, number[]> = {
      '5': [5], '6': [6], '7': [7], '8': [8], '9': [9], '10': [10]
    };
    const hasSchoolAccess = user.school?.isActive && user.grade && 
      (gradeToClassMap[user.grade] || []).includes(programData.id);

    // Check if program is free (price = 0)
    const isFreeProgram = programData.price === 0 || programData.price === null;

    // Build subject access information
    const unitAccess: UnitAccess[] = programData.subjects.map((subject: DbSubject) => {
      const hasSubjectSubscription = subjectSubscriptions.has(subject.id);
      
      // Determine accessible chapters
      let accessibleChapters: string[] = [];
      
      if (isFreeProgram || hasSchoolAccess || !!classSubscription || hasSubjectSubscription) {
        // Full access to all chapters in this unit
        accessibleChapters = subject.chapters.map(ch => ch.id);
      } else if (subject.chapters.length > 0) {
        // Free trial: first chapter of every unit
        const firstChapter = subject.chapters.sort((a, b) => a.orderIndex - b.orderIndex)[0];
        accessibleChapters = [firstChapter.id];
      }
      
      // Unit has access if there are any accessible chapters
      const hasAccess = accessibleChapters.length > 0;
      
      let accessType: UnitAccess['accessType'] = 'none';
      if (hasSchoolAccess) accessType = 'school';
      else if (classSubscription) accessType = 'class_subscription';
      else if (hasSubjectSubscription) accessType = 'subject_subscription';
      else if (accessibleChapters.length > 0 && accessibleChapters.length < subject.chapters.length) {
        accessType = 'free_trial'; // Partial access (first chapter only)
      }

      return {
        id: subject.id,
        name: subject.name,
        hasAccess,
        accessType,
        price: subject.price || undefined,
        currency: subject.currency,
        canUpgrade: hasSubjectSubscription && !classSubscription,
        accessibleChapters
      };
    });

    return NextResponse.json({
      classId: programData.id,
      className: programData.name,
      classPrice: programData.price,
      hasFullAccess: isFreeProgram || hasSchoolAccess || !!classSubscription,
      accessType: hasSchoolAccess ? 'school' : classSubscription ? 'class_subscription' : 'partial',
      unitAccess: unitAccess, // Return as unitAccess for frontend compatibility
      canUpgradeToClass: subjectSubscriptions.size > 0 && !classSubscription,
      upgradeOptions: subjectSubscriptions.size > 0 && !classSubscription && programData.price ? {
        currentSubjects: Array.from(subjectSubscriptions.keys()),
        classPrice: programData.price,
        potentialSavings: (subjectSubscriptions.size * Math.ceil(programData.price / programData.subjects.length)) - programData.price
      } : null,
      // Include subscription details if user has a class subscription
      subscriptionDetails: classSubscription ? {
        id: classSubscription.id,
        planType: classSubscription.planType,
        startDate: classSubscription.startDate,
        endDate: classSubscription.endDate,
        status: classSubscription.status
      } : null
    });

  } catch (error) {
    console.error('Error in program access API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
