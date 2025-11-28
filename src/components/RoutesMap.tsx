import { prisma } from '@/lib/prisma';
import RoutesMapClient, { RouteForClient } from './RoutesMapClient';

// Server component: fetch routes and pass to the client map component
export default async function RoutesMap() {
  const dbRoutes = await prisma.route.findMany();
  const routes: RouteForClient[] = await Promise.all(
    dbRoutes.map(async (r) => {
      const locations = await prisma.location.findMany({ where: { routeId: r.id }, orderBy: { id: 'asc' } });
      const path = locations.map((loc) => ({ lat: loc.lat, lng: loc.lng }));
      return {
        id: String(r.id),
        name: r.name,
        distanceKm: r.distanceKm,
        color: `rgb(${r.colorr}, ${r.colorg}, ${r.colorb})`,
        path,
        start: path[0],
        end: path[path.length - 1],
      };
    }),
  );
  return <RoutesMapClient routes={routes} />;
}
