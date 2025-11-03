import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const subscriptions = await prisma.subscription.findMany({
      include: {
        user: {
          select: {
            email: true,
            name: true
          }
        },
        class: {
          select: {
            id: true,
            name: true
          }
        },
        subject: {
          select: {
            id: true,
            name: true
          }
        }
      },
      orderBy: { created_at: 'desc' }
    });

    // Transform the data to match expected format
    const transformedSubscriptions = subscriptions.map(sub => ({
      ...sub,
      amount: sub.amount || 0,
      paymentId: sub.id, // Use subscription ID as payment ID for now
      created_at: sub.created_at, // Map for frontend compatibility
      user: {
        email: sub.user?.email,
        display_name: sub.user?.name
      }
    }));

    return NextResponse.json(transformedSubscriptions);
  } catch (error) {
    console.error('Error fetching subscriptions:', error);
    return NextResponse.json({ error: 'Failed to fetch subscriptions' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const { subscriptionId, status } = await request.json();
    
    if (!subscriptionId || !status) {
      return NextResponse.json({ error: 'Subscription ID and status are required' }, { status: 400 });
    }

    await prisma.subscription.update({
      where: { id: subscriptionId },
      data: { 
        status,
        updatedAt: new Date()
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating subscription:', error);
    return NextResponse.json({ error: 'Failed to update subscription' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const subscriptionId = searchParams.get('id');
    
    if (!subscriptionId) {
      return NextResponse.json({ error: 'Subscription ID is required' }, { status: 400 });
    }

    await prisma.subscription.delete({
      where: { id: subscriptionId }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting subscription:', error);
    return NextResponse.json({ error: 'Failed to delete subscription' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { userId, classId, subjectId, amount, status, planType } = await request.json();

    if (!userId || !amount || !status || !planType || !classId) {
      return NextResponse.json({ error: 'userId, amount, status, planType, and classId are required' }, { status: 400 });
    }
    
    // Set subscription to expire 1 year from now
    const endDate = new Date();
    endDate.setFullYear(endDate.getFullYear() + 1);
    
    const data = {
      user: { connect: { id: userId } },
      class: { connect: { id: classId } },
      amount,
      status,
      planType,
      currency: 'INR',
      startDate: new Date(),
      endDate: endDate,
      ...(subjectId && { subject: { connect: { id: subjectId } } }),
    };

    const subscription = await prisma.subscription.create({ data });
    return NextResponse.json(subscription);
  } catch (error) {
    console.error('Error creating subscription:', error);
    return NextResponse.json({ error: 'Failed to create subscription' }, { status: 500 });
  }
}


