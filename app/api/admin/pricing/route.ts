import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

// GET - List all pricing plans (optionally filtered by classId)
export async function GET(request: Request) {
  try {
    const session = await auth();
    if (!session?.user || (session.user as { role?: string }).role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const classId = searchParams.get('classId');

    const plans = await prisma.pricingPlan.findMany({
      where: classId ? { classId: parseInt(classId) } : undefined,
      include: {
        class: {
          select: {
            id: true,
            name: true,
            slug: true
          }
        }
      },
      orderBy: [
        { classId: 'asc' },
        { sortOrder: 'asc' }
      ]
    });

    return NextResponse.json({ plans });
  } catch (error) {
    console.error('Error fetching pricing plans:', error);
    return NextResponse.json(
      { error: 'Failed to fetch pricing plans' },
      { status: 500 }
    );
  }
}

// POST - Create a new pricing plan
export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user || (session.user as { role?: string }).role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      classId,
      name,
      durationMonths,
      price,
      originalPrice,
      discount,
      isActive,
      isPopular,
      features,
      sortOrder,
      workbookPrice,
      workbookNote
    } = body;

    // Validate required fields
    if (!classId || !name || !durationMonths || price === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields: classId, name, durationMonths, price' },
        { status: 400 }
      );
    }

    // Check if plan already exists for this class and duration
    const existing = await prisma.pricingPlan.findUnique({
      where: {
        classId_durationMonths: {
          classId: parseInt(classId),
          durationMonths: parseInt(durationMonths)
        }
      }
    });

    if (existing) {
      return NextResponse.json(
        { error: `A pricing plan for ${durationMonths} months already exists for this class` },
        { status: 409 }
      );
    }

    const plan = await prisma.pricingPlan.create({
      data: {
        classId: parseInt(classId),
        name,
        durationMonths: parseInt(durationMonths),
        price: parseInt(price),
        originalPrice: originalPrice ? parseInt(originalPrice) : null,
        discount: discount ? parseInt(discount) : null,
        isActive: isActive ?? true,
        isPopular: isPopular ?? false,
        features: features || [],
        sortOrder: sortOrder ?? 0,
        workbookPrice: workbookPrice ? parseInt(workbookPrice) : null,
        workbookNote: workbookNote || null
      },
      include: {
        class: {
          select: {
            id: true,
            name: true,
            slug: true
          }
        }
      }
    });

    return NextResponse.json({ plan }, { status: 201 });
  } catch (error) {
    console.error('Error creating pricing plan:', error);
    return NextResponse.json(
      { error: 'Failed to create pricing plan' },
      { status: 500 }
    );
  }
}
