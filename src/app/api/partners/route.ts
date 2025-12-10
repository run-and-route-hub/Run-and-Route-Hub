// src/app/api/partners/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// eslint-disable-next-line import/prefer-default-export
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      where: {
        paceMin: { not: null },
        paceMax: { not: null },
      },
      orderBy: { id: 'asc' },
    });

    // Return the array directly so the client can map it
    return NextResponse.json(users);
  } catch (err) {
    console.error('Error loading partners', err);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
