import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Get all users with their subscriptions and payments
    const users = await prisma.user.findMany({
      include: {
        subscriptions: {
          orderBy: { created_at: 'desc' }
        },
        payments: {
          orderBy: { created_at: 'desc' }
        }
      },
      orderBy: { created_at: 'desc' }
    });

    // Transform data to match expected format
    const usersWithSubscriptions = users.map((user: typeof users[number]) => {
      const activeSubscription = user.subscriptions.find((sub: typeof user.subscriptions[number]) => sub.status === 'ACTIVE');
      const completedPayments = user.payments.filter((payment: typeof user.payments[number]) => payment.status === 'COMPLETED');
      
      return {
        uid: user.id,
        email: user.email || '',
        displayName: user.name || user.displayName || user.email?.split('@')[0] || 'User',
        photoUrl: user.image || null,
        collegeName: user.collegeName || null,
        phone: user.phone || null,
        creationTime: user.created_at,
        lastSignInTime: user.updatedAt, // Using updatedAt as proxy for last login
        role: user.role || 'USER',
        isActive: user.isActive !== undefined ? user.isActive : true,
        subscription: activeSubscription ? {
          id: activeSubscription.id,
          status: activeSubscription.status,
          amount: activeSubscription.amount,
          planType: activeSubscription.planType,
          startDate: activeSubscription.startDate,
          endDate: activeSubscription.endDate,
          created_at: activeSubscription.created_at
        } : null,
        hasActiveSubscription: !!activeSubscription,
        totalPayments: user.payments.length,
        totalAmountPaid: completedPayments.reduce((sum: number, payment: { amount: number; status: string }) => sum + payment.amount, 0)
      };
    });

    // Filter out any invalid entries
    const validUsers = usersWithSubscriptions.filter(u => u && u.uid && u.email);

    return NextResponse.json(validUsers);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('id');
    
    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    // Delete user (cascade will handle related records)
    await prisma.user.delete({
      where: { id: userId }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { email, displayName, role } = await request.json();
    
    if (!email || !displayName) {
      return NextResponse.json({ error: 'Email and display name are required' }, { status: 400 });
    }

    // Create user record in database
    // Note: With NextAuth, users are typically created during OAuth flow
    // This endpoint creates a user manually for admin purposes
    const user = await prisma.user.create({
      data: {
        email: email,
        name: displayName,
        role: role || 'USER',
        emailVerified: new Date(), // Mark as verified for admin-created users
      }
    });

    return NextResponse.json({ 
      success: true, 
      user: {
        id: user.id,
        email: user.email,
        displayName: user.name,
        role: user.role,
        isActive: true,
      }
    });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const { userId, displayName, role, isActive, collegeName, phone } = await request.json();
    
    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const updateData: { 
      name?: string; 
      role?: 'USER' | 'ADMIN' | 'TEACHER' | 'MODERATOR'; 
      isActive?: boolean;
      collegeName?: string;
      phone?: string;
    } = {};
    
    if (displayName !== undefined) updateData.name = displayName;
    if (role !== undefined) updateData.role = role;
    if (isActive !== undefined) updateData.isActive = isActive;
    if (collegeName !== undefined) updateData.collegeName = collegeName;
    if (phone !== undefined) updateData.phone = phone;

    // Update user in database
    await prisma.user.update({
      where: { id: userId },
      data: updateData
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}

