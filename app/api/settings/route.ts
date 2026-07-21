import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const KEYS = [
  'IS_PUBLIC',
  'PRIMARY_COLOR',
  'SECONDARY_COLOR',
  'SITE_NAME',
  'ORG_NAME',
  'PROGRAM_LABEL',
  'PROGRAM_PLURAL',
  'HERO_TITLE',
  'HERO_SUBTITLE',
  'ENABLE_PRICING',
] as const;

export async function GET() {
  try {
    const rows = await prisma.adminSettings.findMany({
      where: { key: { in: [...KEYS] } },
      select: { key: true, value: true },
    });
    const settings = Object.fromEntries(rows.map(({ key, value }) => [key, value]));

    return NextResponse.json({
      isPublic: settings.IS_PUBLIC !== 'false',
      primaryColor: settings.PRIMARY_COLOR || '#57A989',
      secondaryColor: settings.SECONDARY_COLOR || '#2CD6FF',
      siteName: settings.SITE_NAME || 'Sciocare',
      orgName: settings.ORG_NAME || 'Sciocare',
      programLabel: settings.PROGRAM_LABEL || 'Program',
      programPlural: settings.PROGRAM_PLURAL || 'Programs',
      heroTitle: settings.HERO_TITLE || 'Learn. Practice. Grow.',
      heroSubtitle: settings.HERO_SUBTITLE || 'Interactive learning built for every student.',
      enablePricing: settings.ENABLE_PRICING !== 'false',
    });
  } catch (error) {
    console.error('Error fetching public settings:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
