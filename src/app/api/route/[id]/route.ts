import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// eslint-disable-next-line import/prefer-default-export
export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const routeId = parseInt(params.id, 10);

    console.log('API: Fetching route with ID:', routeId);

    // eslint-disable-next-line no-restricted-globals
    if (isNaN(routeId)) {
      console.log('API: Invalid route ID');
      return new NextResponse('Invalid route ID', { status: 400 });
    }

    const route = await prisma.route.findUnique({
      where: { id: routeId },
      include: {
        path: true, // Make sure this includes all location data
      },
    });

    console.log('API: Found route:', route ? 'Yes' : 'No');
    console.log('API: Path data:', route?.path); // Debug log

    if (!route) {
      return new NextResponse('Route not found', { status: 404 });
    }

    return NextResponse.json(route);
  } catch (error) {
    console.error('API: Error fetching route:', error);
    return new NextResponse('Failed to fetch route', { status: 500 });
  }
}
