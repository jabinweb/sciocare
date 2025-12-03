import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateSlug } from '@/lib/slug-utils';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const includePricing = searchParams.get('includePricing') === 'true';

    const classes = await prisma.class.findMany({
      include: {
        subjects: {
          select: {
            id: true,
            name: true
          }
        },
        subscriptions: {
          include: {
            user: {
              select: {
                email: true,
                name: true
              }
            }
          }
        },
        ...(includePricing && {
          pricingPlans: {
            select: {
              id: true,
              name: true,
              durationMonths: true,
              price: true,
              isActive: true,
              isPopular: true,
            },
            orderBy: {
              sortOrder: 'asc'
            }
          }
        })
      },
      orderBy: {
        id: 'asc'
      }
    });

    // Transform the data to ensure price is properly formatted
    const transformedPrograms = classes.map((cls: typeof classes[0]) => ({
      ...cls,
      classId: cls.id, // Add classId as the same as id for form compatibility
      price: cls.price ?? 29900, // Ensure price is set (in paisa); allow 0
    }));

    return NextResponse.json(transformedPrograms);
  } catch (error) {
    console.error('Error fetching programs:', error);
    return NextResponse.json({ error: 'Failed to fetch programs' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name, description, isActive, price, logo } = await request.json();
    
    if (!name || !description) {
      return NextResponse.json({ error: 'Name and description are required' }, { status: 400 });
    }

    const slug = generateSlug(name);

    // Accept numeric or string price. Treat explicit 0 as valid (free).
    let pricePaisa: number = 29900;
    if (price !== undefined && price !== null) {
      const numeric = typeof price === 'number' ? price : parseInt(String(price));
      if (!Number.isNaN(numeric)) {
        pricePaisa = numeric * 100;
      }
    }

    const newClass = await prisma.class.create({
      data: {
        name,
        slug,
        description,
        logo: logo || null,
        isActive: isActive !== undefined ? isActive : true,
        price: pricePaisa,
        currency: 'INR',
        created_at: new Date(),
        updatedAt: new Date(),
      }
    });

    return NextResponse.json({ success: true, class: newClass });
  } catch (error) {
    console.error('Error creating program:', error);
    return NextResponse.json({ error: 'Failed to create program' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, name, description, isActive, price, logo } = await request.json();
    
    if (!id) {
      return NextResponse.json({ error: 'Program ID is required' }, { status: 400 });
    }

    // Build update data object
    const updateData: Record<string, unknown> = {
      updatedAt: new Date(),
    };

    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (isActive !== undefined) updateData.isActive = isActive;
    if (logo !== undefined) updateData.logo = logo || null;
    if (price !== undefined && price !== null) {
      const numeric = typeof price === 'number' ? price : parseInt(String(price));
      if (!Number.isNaN(numeric)) {
        updateData.price = numeric * 100; // Convert to paisa
      }
    }

    await prisma.class.update({
      where: { id },
      data: updateData
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating program:', error);
    return NextResponse.json({ error: 'Failed to update program' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const classId = searchParams.get('id');
    
    if (!classId) {
      return NextResponse.json({ error: 'Program ID is required' }, { status: 400 });
    }

    await prisma.class.delete({
      where: { id: parseInt(classId) }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting program:', error);
    return NextResponse.json({ error: 'Failed to delete program' }, { status: 500 });
  }
}
