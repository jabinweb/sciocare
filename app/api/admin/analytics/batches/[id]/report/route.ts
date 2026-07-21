import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

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
        class: true,
        teacher: true,
        teachers: true,
        students: {
          include: {
            activities: {
              where: {
                created_at: {
                  gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
                },
              },
              orderBy: { created_at: 'desc' },
              take: 1,
            },
            progress: {
              include: {
                topic: true,
              },
            },
          },
        },
      },
    });

    if (!batch) {
      return NextResponse.json({ error: 'Batch not found' }, { status: 404 });
    }

    if (session.user?.role === 'TEACHER') {
      const isAssigned =
        batch.teacherId === session.user.id ||
        batch.teachers?.some((t) => t.id === session.user.id);
      if (!isAssigned) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
      }
    }

    const totalTopicsInClass = await prisma.topic.count({
      where: {
        chapter: {
          subject: {
            classId: batch.classId,
          },
        },
      },
    });

    const reportData = {
      batchName: batch.name,
      className: batch.class.name,
      teacherName:
        batch.teachers?.length > 0
          ? batch.teachers.map((t) => t.name).join(', ')
          : batch.teacher?.name || 'Unassigned',
      studentCount: batch.students.length,
      generatedAt: new Date().toISOString(),
      students: batch.students.map((student) => {
        const totalSecondsSpent = student.progress.reduce(
          (acc, p) => acc + (p.timeSpent || 0),
          0
        );
        return {
          id: student.id,
          name: student.name || student.email,
          email: student.email,
          topicsCompleted: student.progress.filter((p) => p.completed).length,
          totalTopics: totalTopicsInClass,
          totalTimeSpent: Math.floor(totalSecondsSpent / 60),
          lastActivity: student.activities[0]?.created_at || 'No recent activity',
        };
      }),
    };

    return NextResponse.json(reportData);
  } catch (error) {
    console.error('Error generating batch report:', error);
    return NextResponse.json({ error: 'Failed to generate report' }, { status: 500 });
  }
}
