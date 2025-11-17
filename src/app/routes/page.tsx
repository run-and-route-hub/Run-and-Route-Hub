import RoutesMapGoogle from '@/components/RoutesMap';

export default function RoutesPage() {
  return (
    <main className="container py-4">
      <h1 className="mb-3">Routes</h1>
      <p className="mb-3">
        Explore example running routes with interactive markers and details.
      </p>
      <RoutesMapGoogle />
    </main>
  );
}
