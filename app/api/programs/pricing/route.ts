import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Get active pricing plans for a class (public endpoint)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const classId = searchParams.get('classId');
    const slug = searchParams.get('slug');

    if (!classId && !slug) {
      return NextResponse.json(
        { error: 'Either classId or slug is required' },
        { status: 400 }
      );
    }

    // Find the class first
    const classData = await prisma.class.findFirst({
      where: classId 
        ? { id: parseInt(classId) }
        : { slug: slug! }
    });

    if (!classData) {
      return NextResponse.json(
        { error: 'Class not found' },
        { status: 404 }
      );
    }

    // Get active pricing plans for this class
    const plans = await prisma.pricingPlan.findMany({
      where: {
        classId: classData.id,
        isActive: true
      },
      orderBy: { sortOrder: 'asc' },
      select: {
        id: true,
        name: true,
        durationMonths: true,
        price: true,
        originalPrice: true,
        discount: true,
        isPopular: true,
        features: true
      }
    });

    // If no custom pricing plans exist, return default pricing
    if (plans.length === 0) {
      return NextResponse.json({
        classId: classData.id,
        className: classData.name,
        hasCustomPricing: false,
        defaultPrice: classData.price,
        plans: []
      });
    }

    return NextResponse.json({
      classId: classData.id,
      className: classData.name,
      hasCustomPricing: true,
      plans
    });
  } catch (error) {
    console.error('Error fetching pricing plans:', error);
    return NextResponse.json(
      { error: 'Failed to fetch pricing plans' },
      { status: 500 }
    );
  }
}
