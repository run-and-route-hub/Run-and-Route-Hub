'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { GoogleMap, LoadScript, Polyline, Marker } from '@react-google-maps/api';

export default function RouteDetailPage() {
  const params = useParams();
  const router = useRouter();
  const routeId = params.id;
  const [route, setRoute] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchRoute = async () => {
      try {
        console.log('Fetching route ID:', routeId);
        const res = await fetch(`/api/route/${routeId}`);

        console.log('Response status:', res.status);

        if (!res.ok) {
          setError(true);
          throw new Error('Failed to fetch route');
        }

        const data = await res.json();
        console.log('Received route data:', data);
        setRoute(data);
      } catch (err) {
        console.error('Error fetching route:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (routeId) {
      fetchRoute();
    }
  }, [routeId]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <p style={{ fontSize: '18px' }}>Loading route...</p>
      </div>
    );
  }

  if (error || !route) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <h1 style={{ fontSize: '32px', marginBottom: '20px' }}>Route not found</h1>
        <p style={{ marginBottom: '20px', color: '#666' }}>
          The route you&apos;re looking for doesn&apos;t exist or there was an error loading it.
        </p>
        <button
          onClick={() => router.push('/find-run')}
          style={{
            padding: '10px 24px',
            backgroundColor: '#0070f3',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '4px',
            fontSize: '16px',
          }}
        >
          Back to Routes
        </button>
      </div>
    );
  }

  const mapPath = route.path
    ?.map((point: any) => {
      const lat = parseFloat(point.lat);
      const lng = parseFloat(point.lng);

      // eslint-disable-next-line no-restricted-globals
      if (!isNaN(lat) && !isNaN(lng)) {
        return { lat, lng };
      }
      return null;
    })
    .filter((point: any) => point !== null) || [];

  console.log('Map path data:', mapPath);
  console.log('Number of points:', mapPath.length);
  console.log('First point:', route.path?.[0]);

  const center = mapPath[0] || { lat: 21.3005, lng: -157.817 };
  const startPoint = mapPath[0];
  const endPoint = mapPath[mapPath.length - 1];

  console.log('Map center:', center);

  const routeColor = route.colorr !== undefined && route.colorg !== undefined && route.colorb !== undefined
    ? `rgb(${route.colorr}, ${route.colorg}, ${route.colorb})`
    : '#1d4ed8';

  return (
    <main>
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '40px 20px' }}>
        <button
          onClick={() => router.push('/find-run')}
          style={{
            cursor: 'pointer',
            padding: '0.3rem 0.7rem',
            borderRadius: '999px',
            fontSize: '0.85rem',
            marginRight: '1rem',
            backgroundColor: 'var(--rrh-green)',
            color: 'white',
            border: 'none',
          }}
        >
          ← Back to Routes
        </button>

        <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '20px' }}>
          {route.name}
        </h1>

        <div style={{ marginBottom: '30px' }}>
          <p style={{ fontSize: '18px', marginBottom: '10px' }}>
            <strong>Distance:</strong> {route.distanceMile?.toFixed(2)} miles ({route.distanceKm?.toFixed(2)} km)
          </p>
        </div>
      </div>

      {mapPath.length > 0 ? (
        <div style={{ width: '100%', height: '70vh', marginBottom: '40px' }}>
          {process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY ? (
            <LoadScript
              googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY as string}
              loadingElement={<div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading map...</div>}
            >
              <GoogleMap
                mapContainerStyle={{ width: '100%', height: '400px', borderRadius: 4, marginBottom: 12 }}
                center={center}
                zoom={15}
                options={{
                  streetViewControl: false,
                  mapTypeControl: false,
                  fullscreenControl: false,
                }}
              >
                <Polyline
                  path={mapPath}
                  options={{
                    strokeColor: routeColor,
                    strokeWeight: 5,
                  }}
                />

                {startPoint && (
                  <Marker
                    position={startPoint}
                    label="S"
                    title={`${route.name} - Start`}
                  />
                )}

                {endPoint && (startPoint.lat !== endPoint.lat || startPoint.lng !== endPoint.lng) && (
                  <Marker
                    position={endPoint}
                    label="E"
                    title={`${route.name} - End`}
                  />
                )}
              </GoogleMap>
            </LoadScript>
          ) : (
            <div style={{
              width: '100%',
              height: '400px',
              backgroundColor: '#fee',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
              textAlign: 'center',
              borderRadius: 4,
            }}
            >
              <div>
                <p style={{ color: '#c00', fontSize: '18px', marginBottom: '10px' }}>⚠️ Google Maps API Key Missing</p>
                <p style={{ color: '#666', fontSize: '14px' }}>
                  Add NEXT_PUBLIC_GOOGLE_MAPS_KEY to your .env.local file
                </p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div
          style={{
            width: '100%',
            height: '400px',
            backgroundColor: '#f0f0f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1.5rem',
            borderRadius: 4,
          }}
        >
          <p style={{ color: '#666', fontSize: '1rem' }}>No route path data available</p>
        </div>
      )}

    </main>
  );
}
