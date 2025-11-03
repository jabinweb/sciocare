import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const program = await prisma.class.findUnique({
      where: { slug },
      include: {
        subjects: {
          select: {
            id: true,
            name: true,
            icon: true,
            color: true,
            isLocked: true,
            orderIndex: true,
            price: true,
            currency: true,
          },
          orderBy: {
            orderIndex: 'asc'
          }
        }
      }
    });

    if (!program) {
      return NextResponse.json({ error: 'Program not found' }, { status: 404 });
    }

    return NextResponse.json(program);
  } catch (error) {
    console.error('Error fetching program:', error);
    return NextResponse.json({ error: 'Failed to fetch program' }, { status: 500 });
  }
}
