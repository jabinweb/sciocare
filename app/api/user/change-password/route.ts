import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { updateUserPassword, verifyUserPassword } from '@/lib/auth-helpers';

export async function POST(request: Request) {
  try {
    const session = await auth();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { currentPassword, newPassword } = await request.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ 
        error: 'Current password and new password are required' 
      }, { status: 400 });
    }

    if (newPassword.length < 6) {
      return NextResponse.json({ 
        error: 'New password must be at least 6 characters long' 
      }, { status: 400 });
    }

    // Verify current password
    const isValid = await verifyUserPassword(session.user.email, currentPassword);
    
    if (!isValid) {
      return NextResponse.json({ 
        error: 'Current password is incorrect' 
      }, { status: 400 });
    }

    // Update to new password
    const success = await updateUserPassword(session.user.email, newPassword);

    if (!success) {
      return NextResponse.json({ 
        error: 'Failed to update password' 
      }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true,
      message: 'Password updated successfully' 
    });

  } catch (error) {
    console.error('Change password error:', error);
    return NextResponse.json({ 
      error: 'Failed to change password',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
