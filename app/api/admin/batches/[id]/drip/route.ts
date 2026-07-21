import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

/**
 * GET /api/admin/batches/[id]/drip
 * Returns the drip configuration for a batch, including all subjects for the class.
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  const role = session?.user?.role;
  if (!session || (role !== 'ADMIN' && role !== 'TEACHER' && role !== 'MODERATOR')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id: batchId } = await params;

  try {
    const batch = await prisma.batch.findUnique({
      where: { id: batchId },
      include: {
        class: {
          include: {
            subjects: {
              orderBy: { orderIndex: 'asc' as const },
              select: { id: true, name: true, icon: true, color: true, orderIndex: true },
            },
          },
        },
      },
    });

    if (!batch) {
      return NextResponse.json({ error: 'Batch not found' }, { status: 404 });
    }

    const dripConfigs = await prisma.batchDripConfig.findMany({
      where: { batchId },
    });

    const configMap = new Map(
      dripConfigs.map((c) => [c.subjectId, c.unlockAfterDays])
    );

    const classSubjects = batch.class.subjects;

    const subjects = classSubjects.map((subject, index: number) => ({
      id: subject.id,
      name: subject.name,
      icon: subject.icon,
      color: subject.color,
      orderIndex: subject.orderIndex,
      unlockAfterDays: configMap.get(subject.id) ?? index * 7,
      isPersisted: configMap.has(subject.id),
    }));

    const isDripEnabled = batch.isDripEnabled ?? false;
    const dripStartDate = batch.dripStartDate ?? null;
    const savedSubjectCount = dripConfigs.length;
    const hasPersistedSchedule = savedSubjectCount > 0;
    const missingFromSchedule = classSubjects.filter((s) => !configMap.has(s.id)).length;

    const scheduleWarnings: string[] = [];
    if (isDripEnabled) {
      if (!dripStartDate) {
        scheduleWarnings.push(
          'Drip is enabled but no start date is set. Set a start date and save — until then, students are not drip-locked.'
        );
      } else if (!hasPersistedSchedule) {
        scheduleWarnings.push(
          'Drip is enabled but the unit schedule has not been saved. Students still have full access to all units. Click "Save Schedule" below.'
        );
      } else if (missingFromSchedule > 0) {
        scheduleWarnings.push(
          `${missingFromSchedule} unit(s) are missing from the saved schedule. Save again to include them, or those units stay locked for students.`
        );
      }
    }

    return NextResponse.json({
      batchId: batch.id,
      batchName: batch.name,
      className: batch.class.name,
      isDripEnabled,
      dripStartDate,
      subjects,
      savedSubjectCount,
      hasPersistedSchedule,
      scheduleWarnings,
    });
  } catch (error) {
    console.error('Error fetching drip config:', error);
    return NextResponse.json({ error: 'Failed to fetch drip config' }, { status: 500 });
  }
}

/**
 * PUT /api/admin/batches/[id]/drip
 * Saves the drip configuration for a batch.
 */
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  const role = session?.user?.role;
  if (!session || (role !== 'ADMIN' && role !== 'MODERATOR')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id: batchId } = await params;

  try {
    const body = await request.json();
    const { isDripEnabled, dripStartDate, subjects } = body as {
      isDripEnabled: boolean;
      dripStartDate: string | null;
      subjects: Array<{ id: string; unlockAfterDays: number }>;
    };

    if (!Array.isArray(subjects)) {
      return NextResponse.json({ error: 'subjects must be an array' }, { status: 400 });
    }

    await prisma.batch.update({
      where: { id: batchId },
      data: {
        isDripEnabled,
        dripStartDate: dripStartDate ? new Date(dripStartDate) : null,
      },
    });

    await Promise.all(
      subjects.map((subject) =>
        prisma.batchDripConfig.upsert({
          where: { batchId_subjectId: { batchId, subjectId: subject.id } },
          create: {
            batchId,
            subjectId: subject.id,
            unlockAfterDays: subject.unlockAfterDays,
          },
          update: {
            unlockAfterDays: subject.unlockAfterDays,
          },
        })
      )
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving drip config:', error);
    return NextResponse.json({ error: 'Failed to save drip config' }, { status: 500 });
  }
}
