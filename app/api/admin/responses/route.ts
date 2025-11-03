import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const formType = searchParams.get('formType');
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Build where clause with proper typing
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {};
    if (formType) {
      where.formType = formType;
    }
    if (status) {
      where.status = status;
    }

    // Get form responses with pagination
    const [responses, total] = await Promise.all([
      prisma.formResponse.findMany({
        where,
        orderBy: { created_at: 'desc' },
        take: limit,
        skip: offset,
      }),
      prisma.formResponse.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: responses,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total,
      },
    });
  } catch (error) {
    console.error('Error fetching form responses:', error);
    return NextResponse.json({ error: 'Failed to fetch form responses' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const responseId = searchParams.get('id');
    
    if (!responseId) {
      return NextResponse.json({ error: 'Response ID is required' }, { status: 400 });
    }

    await prisma.formResponse.delete({
      where: { id: responseId }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting form response:', error);
    return NextResponse.json({ error: 'Failed to delete form response' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const { responseId, status, metadata } = await request.json();
    
    if (!responseId) {
      return NextResponse.json({ error: 'Response ID is required' }, { status: 400 });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateData: any = {};
    if (status) {
      updateData.status = status;
    }
    if (metadata) {
      updateData.metadata = metadata;
    }

    await prisma.formResponse.update({
      where: { id: responseId },
      data: updateData,
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating form response:', error);
    return NextResponse.json({ error: 'Failed to update form response' }, { status: 500 });
  }
}

