import { NextResponse } from 'next/server';
// eslint-disable-next-line import/no-named-as-default
import { prisma } from '@/lib/prisma';
// eslint-disable-next-line import/prefer-default-export
export async function POST(req: Request) {
  try {
    const { minDistance } = await req.json();
    console.log('Filters received in backend:', { minDistance });
    const filters: any = {};
    if (minDistance && minDistance !== 'Any') {
      const min = parseFloat(minDistance);
      // eslint-disable-next-line no-restricted-globals
      if (!isNaN(min)) {
        filters.distanceMile = { gte: min };
      }
    }
    const routes = await prisma.route.findMany({
      where: filters,
    });
    const runs = routes.map(route => ({
      id: route.id,
      location: route.name,
      distanceMI: route.distanceMile,
      distanceKM: route.distanceKm,
    }));

    console.log('Returning runs:', runs);

    return NextResponse.json({ runs });
  } catch (error) {
    console.error('API error:', error);
    return new NextResponse('Failed to fetch filtered routes', { status: 500 });
  }
}
