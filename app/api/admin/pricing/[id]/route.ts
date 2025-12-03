import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

// GET - Get a single pricing plan
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user || (session.user as { role?: string }).role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    const plan = await prisma.pricingPlan.findUnique({
      where: { id },
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

    if (!plan) {
      return NextResponse.json({ error: 'Pricing plan not found' }, { status: 404 });
    }

    return NextResponse.json({ plan });
  } catch (error) {
    console.error('Error fetching pricing plan:', error);
    return NextResponse.json(
      { error: 'Failed to fetch pricing plan' },
      { status: 500 }
    );
  }
}

// PUT - Update a pricing plan
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user || (session.user as { role?: string }).role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    const {
      name,
      price,
      originalPrice,
      discount,
      isActive,
      isPopular,
      features,
      sortOrder
    } = body;

    // Check if plan exists
    const existing = await prisma.pricingPlan.findUnique({
      where: { id }
    });

    if (!existing) {
      return NextResponse.json({ error: 'Pricing plan not found' }, { status: 404 });
    }

    const plan = await prisma.pricingPlan.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(price !== undefined && { price: parseInt(price) }),
        ...(originalPrice !== undefined && { originalPrice: originalPrice ? parseInt(originalPrice) : null }),
        ...(discount !== undefined && { discount: discount ? parseInt(discount) : null }),
        ...(isActive !== undefined && { isActive }),
        ...(isPopular !== undefined && { isPopular }),
        ...(features !== undefined && { features }),
        ...(sortOrder !== undefined && { sortOrder: parseInt(sortOrder) })
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

    return NextResponse.json({ plan });
  } catch (error) {
    console.error('Error updating pricing plan:', error);
    return NextResponse.json(
      { error: 'Failed to update pricing plan' },
      { status: 500 }
    );
  }
}

// DELETE - Delete a pricing plan
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user || (session.user as { role?: string }).role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    // Check if plan exists
    const existing = await prisma.pricingPlan.findUnique({
      where: { id }
    });

    if (!existing) {
      return NextResponse.json({ error: 'Pricing plan not found' }, { status: 404 });
    }

    await prisma.pricingPlan.delete({
      where: { id }
    });

    return NextResponse.json({ message: 'Pricing plan deleted successfully' });
  } catch (error) {
    console.error('Error deleting pricing plan:', error);
    return NextResponse.json(
      { error: 'Failed to delete pricing plan' },
      { status: 500 }
    );
  }
}
