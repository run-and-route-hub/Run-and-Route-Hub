'use client';

import React, { useMemo, useState } from 'react';
import { GoogleMap, Polyline, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';
import Link from 'next/link';

export type RouteForClient = {
  id: string;
  name: string;
  distanceKm: number;
  color?: string;
  path: google.maps.LatLngLiteral[];
  start?: google.maps.LatLngLiteral;
  end?: google.maps.LatLngLiteral;
};

type SelectedMarker = {
  routeId: string;
  position: google.maps.LatLngLiteral;
  type: 'start' | 'end';
};

function sameLatLng(a?: google.maps.LatLngLiteral, b?: google.maps.LatLngLiteral): boolean {
  if (!a || !b) return false;
  return a.lat === b.lat && a.lng === b.lng;
}

export default function RoutesMapClient({ routes }: { routes: RouteForClient[] }) {
  const center = useMemo(() => routes[0]?.path[0] ?? { lat: 21.3005, lng: -157.817 }, [routes]);
  const [selected, setSelected] = useState<SelectedMarker | null>(null);

  const handleMarkerClick = (routeId: string, position: google.maps.LatLngLiteral, type: 'start' | 'end') => {
    setSelected({ routeId, position, type });
  };

  const selectedRoute = selected ? routes.find((r) => r.id === selected.routeId) : undefined;

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!,
    libraries: ['geometry'],
  });

  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <div style={{ width: '100%', height: '70vh', borderRadius: 12, overflow: 'hidden' }}>
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '100%' }}
        center={center}
        zoom={15}
        options={{
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
      >
        {routes.map((route) => (
          <Polyline
            key={route.id}
            path={route.path}
            options={{
              strokeColor: route.color ?? '#1d4ed8',
              strokeWeight: 5,
            }}
          />
        ))}

        {routes.flatMap((route) => {
          const markers: JSX.Element[] = [];

          if (route.start) {
            markers.push(
              <Marker
                key={`${route.id}-start`}
                position={route.start}
                label="S"
                title={`${route.name} – start (${route.distanceKm} km)`}
                onClick={() => handleMarkerClick(route.id, route.start!, 'start')}
              />,
            );
          }

          if (route.end && !sameLatLng(route.start, route.end)) {
            markers.push(
              <Marker
                key={`${route.id}-end`}
                position={route.end}
                label="E"
                title={`${route.name} – finish (${route.distanceKm} km)`}
                onClick={() => handleMarkerClick(route.id, route.end!, 'end')}
              />,
            );
          }

          return markers;
        })}

            <InfoWindow position={selected.position} onCloseClick={() => setSelected(null)}>
              <div style={{ maxWidth: 220 }}>
                <h6 style={{ marginBottom: 4 }}>{selectedRoute.name}</h6>
                <p style={{ marginBottom: 4 }}>
                  Distance:
                  {' '}
                  {selectedRoute.distanceKm}
                  {' '}
                  km
                </p>
                <p style={{ marginBottom: 0 }}>
                  This is the
                  {' '}
                  <strong>{selected.type === 'start' ? 'start' : 'end'}</strong>
                  {' '}
                  of the route.
                </p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}
