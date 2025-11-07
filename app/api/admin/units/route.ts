import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const programSlug = searchParams.get('programSlug');
    const programId = searchParams.get('programId');
    const classId = searchParams.get('classId');
    
    // Accept programSlug (preferred), programId, or classId (legacy)
    let finalClassId: number | null = null;
    
    if (programSlug) {
      const program = await prisma.class.findUnique({
        where: { slug: programSlug },
        select: { id: true }
      });
      if (program) {
        finalClassId = program.id;
      }
    } else {
      const idParam = programId || classId;
      if (idParam) {
        finalClassId = parseInt(idParam);
      }
    }
    
    const subjects = await prisma.subject.findMany({
      where: finalClassId ? { classId: finalClassId } : {},
      orderBy: { orderIndex: 'asc' }
    });

    return NextResponse.json(subjects);
  } catch (error) {
    console.error('Error fetching units:', error);
    return NextResponse.json({ error: 'Failed to fetch units' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name, icon, color, isLocked, orderIndex, programId, classId } = await request.json();
    
    // Accept either programId (from frontend) or classId (legacy)
    const finalClassId = programId || classId;
    
    if (!finalClassId) {
      return NextResponse.json({ error: 'Program ID is required' }, { status: 400 });
    }
    
    const newSubject = await prisma.subject.create({
      data: {
        name,
        icon,
        color,
        isLocked: isLocked ?? false,
        orderIndex,
        classId: parseInt(finalClassId),
      }
    });

    return NextResponse.json(newSubject);
  } catch (error) {
    console.error('Error creating unit:', error);
    return NextResponse.json({ error: 'Failed to create unit' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, name, icon, color, isLocked, orderIndex } = await request.json();
    
    const updatedSubject = await prisma.subject.update({
      where: { id },
      data: {
        name,
        icon,
        color,
        isLocked,
        orderIndex,
      }
    });

    return NextResponse.json(updatedSubject);
  } catch (error) {
    console.error('Error updating unit:', error);
    return NextResponse.json({ error: 'Failed to update unit' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const unitId = searchParams.get('id');
    
    if (!unitId) {
      return NextResponse.json({ error: 'Unit ID is required' }, { status: 400 });
    }

    await prisma.subject.delete({
      where: { id: unitId }
    });

    return NextResponse.json({ message: 'Unit deleted successfully' });
  } catch (error) {
    console.error('Error deleting unit:', error);
    return NextResponse.json({ error: 'Failed to delete unit' }, { status: 500 });
  }
}
