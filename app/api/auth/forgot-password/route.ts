import { NextRequest, NextResponse } from 'next/server';
import { generatePasswordResetToken } from '@/lib/auth-helpers';
import { sendPasswordResetEmail } from '@/lib/mail';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Generate reset token
    const token = await generatePasswordResetToken(email);

    if (!token) {
      // Don't reveal if email exists or not for security
      return NextResponse.json({ 
        success: true, 
        message: 'If an account exists with this email, you will receive a password reset link.' 
      });
    }

    // Get the base URL from the request
    const host = req.headers.get('host') || 'localhost:3000';
    const protocol = req.headers.get('x-forwarded-proto') || (host.includes('localhost') ? 'http' : 'https');
    const baseUrl = `${protocol}://${host}`;
    
    // Send reset email
    const resetUrl = `${baseUrl}/auth/reset-password?token=${token}`;
    
    await sendPasswordResetEmail(email, resetUrl);

    return NextResponse.json({ 
      success: true, 
      message: 'Password reset link sent to your email.' 
    });
  } catch (error) {
    console.error('Password reset request error:', error);
    return NextResponse.json(
      { error: 'Failed to process password reset request' },
      { status: 500 }
    );
  }
}
