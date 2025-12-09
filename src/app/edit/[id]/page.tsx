import EditRouteForm from '@/components/EditRouteForm';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';

interface Params {
  params: { id: string };
}

export default async function EditRoutePage({ params }: Params) {
  const routeId = Number(params.id);
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(routeId)) return notFound();

  const route = await prisma.route.findUnique({
    where: { id: routeId },
    include: { path: true },
  });

  if (!route) return notFound();

  const safeRoute = {
    ...route,
    path: route.path.map(loc => ({
      id: loc.id,
      lat: Number(loc.lat),
      lng: Number(loc.lng),
      routeId: loc.routeId ?? null,
    })),
  };

  return (
    <main>
      <EditRouteForm route={safeRoute} />;
    </main>
  );
}
