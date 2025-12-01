import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// eslint-disable-next-line import/prefer-default-export
export async function POST(req: Request) {
  try {
    const { difficulty, minDistance, pace } = await req.json();

    const filters: any = {};

    if (difficulty && difficulty !== 'Any') {
      filters.difficulty = difficulty;
    }

    if (minDistance && minDistance !== 'Any') {
      const min = parseFloat(minDistance);
      // eslint-disable-next-line no-restricted-globals
      if (!isNaN(min)) {
        filters.distance = { gte: min };
      }
    }

    if (pace && pace !== 'Any') {
      filters.pace = pace;
    }

    const runs = await prisma.run.findMany({
      where: filters,
    });

    return NextResponse.json(runs);
  } catch (error) {
    console.error('API error:', error);
    return new NextResponse('Failed to fetch filtered runs', { status: 500 });
  }
}
