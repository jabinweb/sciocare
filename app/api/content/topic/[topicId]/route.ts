import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { logTopicStarted } from '@/lib/activity-logger';
import { canAccessTopic } from '@/lib/lms-access';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ topicId: string }> }
) {
  const { topicId } = await params;

  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const topic = await prisma.topic.findUnique({
      where: { id: topicId },
      select: {
        id: true,
        name: true,
        description: true,
        type: true,
        duration: true,
        content: {
          select: {
            contentType: true,
            url: true,
            videoUrl: true,
            pdfUrl: true,
            textContent: true,
            iframeHtml: true,
            widgetConfig: true,
          },
        },
      },
    });

    if (!topic) {
      return NextResponse.json({ error: 'Topic not found' }, { status: 404 });
    }

    const access = await canAccessTopic(session.user.id, topicId);

    if (!access.hasAccess) {
      const message =
        access.reason === 'drip_locked'
          ? 'This unit is not unlocked yet. Please check back when it becomes available.'
          : 'Access denied. Your subscription or batch access has expired.';

      return NextResponse.json({ error: message }, { status: 403 });
    }

    if (!topic.content) {
      return NextResponse.json({ error: 'Content not found' }, { status: 404 });
    }

    logTopicStarted(session.user.id, topicId, topic.name).catch((err) =>
      console.error('Failed to log topic access:', err)
    );

    return NextResponse.json(
      {
        id: topic.id,
        name: topic.name,
        description: topic.description,
        type: topic.type,
        duration: topic.duration,
        content: topic.content,
      },
      {
        headers: {
          'Cache-Control': 'private, max-age=300, stale-while-revalidate=600',
        },
      }
    );
  } catch (error) {
    console.error('Error fetching topic content:', error);
    return NextResponse.json({ error: 'Failed to fetch topic content' }, { status: 500 });
  }
}
