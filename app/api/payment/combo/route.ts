import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { createPaymentOrder } from '@/lib/payment-service';

export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const { basicsClassId, advancedClassId, durationMonths, gateway = 'RAZORPAY' } = await req.json();

    if (!basicsClassId || !advancedClassId || !durationMonths) {
      return NextResponse.json({ 
        error: 'Missing required fields: basicsClassId, advancedClassId, durationMonths' 
      }, { status: 400 });
    }

    // Fetch both programs with their pricing plans
    const [basicsClass, advancedClass] = await Promise.all([
      prisma.class.findUnique({
        where: { id: basicsClassId },
        include: {
          pricingPlans: {
            where: {
              durationMonths,
              isActive: true,
            },
          },
        },
      }),
      prisma.class.findUnique({
        where: { id: advancedClassId },
        include: {
          pricingPlans: {
            where: {
              durationMonths,
              isActive: true,
            },
          },
        },
      }),
    ]);

    if (!basicsClass || !advancedClass) {
      return NextResponse.json({ error: 'One or both programs not found' }, { status: 404 });
    }

    const basicsPlan = basicsClass.pricingPlans[0] as any;
    const advancedPlan = advancedClass.pricingPlans[0] as any;

    if (!basicsPlan || !advancedPlan) {
      return NextResponse.json({ 
        error: `No active pricing plan found for ${durationMonths} months` 
      }, { status: 404 });
    }

    // Calculate combo pricing
    const basicsTotal = basicsPlan.price + (basicsPlan.workbookPrice || 0);
    const advancedTotal = advancedPlan.price + (advancedPlan.workbookPrice || 0);
    const originalTotal = basicsTotal + advancedTotal;
    
    const comboDiscount = basicsPlan.comboDiscount || 0;
    const discountAmount = Math.round(originalTotal * (comboDiscount / 100));
    const finalAmount = originalTotal - discountAmount;

    // Create payment order
    const orderData = await createPaymentOrder({
      amount: finalAmount,
      currency: 'INR',
      userId: user.id,
      metadata: {
        type: 'combo',
        basicsClassId,
        advancedClassId,
        basicsPricingPlanId: basicsPlan.id,
        advancedPricingPlanId: advancedPlan.id,
        durationMonths,
        basicsPrice: basicsPlan.price,
        advancedPrice: advancedPlan.price,
        basicsWorkbookPrice: basicsPlan.workbookPrice || 0,
        advancedWorkbookPrice: advancedPlan.workbookPrice || 0,
        comboDiscount,
        discountAmount,
        originalTotal,
        finalAmount,
        userId: user.id,
        userName: user.displayName || user.name || '',
        userEmail: user.email,
      },
      gateway,
    });

    // Format response for frontend (similar to class payment route)
    return NextResponse.json({
      success: true,
      order: {
        id: orderData.orderData.id,
        amount: orderData.orderData.amount,
        currency: orderData.orderData.currency,
        keyId: orderData.orderData.key_id,
        gateway: orderData.gateway,
        metadata: {
          type: 'combo',
          basicsClassId,
          advancedClassId,
          basicsPricingPlanId: basicsPlan.id,
          advancedPricingPlanId: advancedPlan.id,
          durationMonths,
          basicsPrice: basicsPlan.price,
          advancedPrice: advancedPlan.price,
          basicsWorkbookPrice: basicsPlan.workbookPrice || 0,
          advancedWorkbookPrice: advancedPlan.workbookPrice || 0,
          comboDiscount,
          discountAmount,
          originalTotal,
          finalAmount,
          userId: user.id,
          userName: user.displayName || user.name || '',
          userEmail: user.email,
        },
      },
      details: {
        basicsProgram: basicsClass.name,
        advancedProgram: advancedClass.name,
        duration: `${durationMonths} months`,
        basicsPrice: basicsPlan.price,
        advancedPrice: advancedPlan.price,
        basicsWorkbook: basicsPlan.workbookPrice || 0,
        advancedWorkbook: advancedPlan.workbookPrice || 0,
        originalTotal,
        comboDiscount,
        discountAmount,
        finalAmount,
      },
    });
  } catch (error) {
    console.error('Error creating combo payment order:', error);
    return NextResponse.json(
      { error: 'Failed to create payment order' },
      { status: 500 }
    );
  }
}
