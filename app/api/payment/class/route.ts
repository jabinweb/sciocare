import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createPaymentOrder, getPaymentConfig } from '@/lib/payment-service';

export async function POST(req: Request) {
  try {
    const { classId, userId, planId, durationMonths } = await req.json();

    if (!classId || !userId) {
      return NextResponse.json({ error: 'Class ID and User ID are required' }, { status: 400 });
    }

    // Get class details
    const classData = await prisma.class.findUnique({
      where: { id: classId },
      select: {
        id: true,
        name: true,
        slug: true,
        price: true,
        currency: true
      }
    });

    if (!classData) {
      return NextResponse.json({ error: 'Class not found' }, { status: 404 });
    }

    // Determine price and duration based on plan or direct values
    let finalPrice = classData.price || 0;
    let finalDurationMonths = 12; // Default to 12 months
    let planName = `${classData.name} Access`;

    // Check if using a pricing plan from database
    if (planId) {
      const plan = await prisma.pricingPlan.findUnique({
        where: { id: planId }
      });
      if (plan) {
        finalPrice = plan.price;
        finalDurationMonths = plan.durationMonths;
        planName = plan.name;
      }
    } else if (durationMonths && [3, 6, 12].includes(durationMonths)) {
      // Try to find a pricing plan for this class and duration
      const plan = await prisma.pricingPlan.findFirst({
        where: {
          classId: classId,
          durationMonths: durationMonths,
          isActive: true
        }
      });
      
      if (plan) {
        finalPrice = plan.price;
        finalDurationMonths = plan.durationMonths;
        planName = plan.name;
      } else {
        // Fallback: Custom duration pricing (proportional)
        finalDurationMonths = durationMonths;
        const basePrice = classData.price || 99900; // Default ₹999 for 12 months
        finalPrice = Math.round((basePrice / 12) * durationMonths);
        planName = `${classData.name} - ${durationMonths} Month Access`;
      }
    }

    // Check if user already has a FULL CLASS subscription (not individual subjects)
    const existingClassSubscription = await prisma.subscription.findFirst({
      where: {
        userId: userId,
        classId: classId,
        subjectId: null, // Only check for class-level subscriptions
        status: 'ACTIVE',
        endDate: {
          gte: new Date()
        }
      },
      select: {
        id: true,
        status: true,
        startDate: true,
        endDate: true,
        planType: true
      }
    });

    if (existingClassSubscription) {
      return NextResponse.json({ 
        error: 'Already subscribed to this class',
        details: {
          subscriptionId: existingClassSubscription.id,
          status: existingClassSubscription.status,
          startDate: existingClassSubscription.startDate,
          endDate: existingClassSubscription.endDate,
          planType: existingClassSubscription.planType
        }
      }, { status: 400 });
    }

    // Create payment order using unified service
    const orderResult = await createPaymentOrder({
      userId: userId,
      amount: finalPrice,
      currency: classData.currency || 'INR',
      description: planName
    });

    if (!orderResult) {
      return NextResponse.json({ 
        error: 'Payment order creation failed' 
      }, { status: 500 });
    }

    // Metadata to pass to verification
    const metadata = {
      classId,
      userId,
      planId: planId || null,
      durationMonths: finalDurationMonths,
      planName,
      price: finalPrice
    };

    // Format response based on gateway
    if (orderResult.gateway === 'RAZORPAY') {
      return NextResponse.json({
        orderId: orderResult.orderData.id,
        amount: orderResult.orderData.amount,
        currency: orderResult.orderData.currency,
        keyId: orderResult.orderData.key_id || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        classId: classId,
        className: classData.name,
        gateway: orderResult.gateway,
        metadata // Include metadata for frontend to pass to verify
      });
    } else if (orderResult.gateway === 'CASHFREE') {
      // For Cashfree, we might have different response structures
      const cashfreeResponse: {
        orderId: string;
        amount: number;
        currency: string;
        classId: number;
        className: string;
        gateway: string;
        environment?: string;
        payment_session_id?: string;
        checkout_url?: string;
        payment_link?: string;
      } = {
        orderId: orderResult.orderData.order_id,
        amount: orderResult.orderData.order_amount * 100, // Convert back to paise for frontend
        currency: orderResult.orderData.order_currency,
        classId: classId,
        className: classData.name,
        gateway: orderResult.gateway
      };
      
      // Add environment info for frontend to use correct mode
      const config = await getPaymentConfig();
      cashfreeResponse.environment = config.cashfree.environment?.toLowerCase();
      
      // Add payment_session_id if available
      if (orderResult.orderData.payment_session_id) {
        cashfreeResponse.payment_session_id = orderResult.orderData.payment_session_id;
      }
      
      // Add checkout URL if available (alternative to payment_session_id)
      if (orderResult.orderData.checkout_url) {
        cashfreeResponse.checkout_url = orderResult.orderData.checkout_url;
      }
      
      // Add payment link if available
      if (orderResult.orderData.payment_link) {
        cashfreeResponse.payment_link = orderResult.orderData.payment_link;
      }
      
      console.log('[info] Cashfree payment response:', cashfreeResponse);
      
      return NextResponse.json(cashfreeResponse);
    }
    
    // If no gateway matched, return error
    return NextResponse.json({ 
      error: 'No valid payment gateway configured' 
    }, { status: 500 });
  } catch (error) {
    console.error('Class payment creation error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Payment creation failed';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
