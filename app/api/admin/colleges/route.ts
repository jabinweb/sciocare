import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const colleges = await prisma.school.findMany({
      orderBy: { created_at: 'desc' }
    });

    return NextResponse.json(colleges || []);
  } catch (error) {
    console.error('Error fetching colleges:', error);
    return NextResponse.json({ error: 'Failed to fetch colleges' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const {
      name,
      email,
      phone,
      address,
      website,
      principalName,
      contactPerson,
      studentCount
    } = await request.json();
    
    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }

    // Don't include ID - let the database generate it automatically
    const newCollege = await prisma.school.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone?.trim() || null,
        address: address?.trim() || null,
        website: website?.trim() || null,
        principalName: principalName?.trim() || null,
        contactPerson: contactPerson?.trim() || null,
        studentCount: studentCount || 0,
        isActive: true,
      }
    });

    return NextResponse.json({ success: true, college: newCollege });
  } catch (error) {
    console.error('Error creating college:', error);
    
    // Handle Prisma-specific errors
    if (error instanceof Error && error.message.includes('Unique constraint')) {
      return NextResponse.json({ 
        error: 'A college with this email already exists'
      }, { status: 409 });
    }
    
    return NextResponse.json({ 
      error: 'Failed to create college', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const {
      id,
      name,
      email,
      phone,
      address,
      website,
      principalName,
      contactPerson,
      studentCount,
      isActive
    } = await request.json();
    
    if (!id) {
      return NextResponse.json({ error: 'College ID is required' }, { status: 400 });
    }

    const updateData: Record<string, unknown> = {};

    if (name !== undefined) updateData.name = name;
    if (email !== undefined) updateData.email = email;
    if (phone !== undefined) updateData.phone = phone;
    if (address !== undefined) updateData.address = address;
    if (website !== undefined) updateData.website = website;
    if (principalName !== undefined) updateData.principalName = principalName;
    if (contactPerson !== undefined) updateData.contactPerson = contactPerson;
    if (studentCount !== undefined) updateData.studentCount = studentCount;
    if (isActive !== undefined) updateData.isActive = isActive;

    await prisma.school.update({
      where: { id },
      data: updateData
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating college:', error);
    return NextResponse.json({ error: 'Failed to update college' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const collegeId = searchParams.get('id');
    
    if (!collegeId) {
      return NextResponse.json({ error: 'College ID is required' }, { status: 400 });
    }

    await prisma.school.delete({
      where: { id: collegeId }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting college:', error);
    return NextResponse.json({ error: 'Failed to delete college' }, { status: 500 });
  }
}
