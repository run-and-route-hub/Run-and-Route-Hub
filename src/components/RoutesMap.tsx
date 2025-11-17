'use client';

import { useMemo, useState } from 'react';
import { GoogleMap, LoadScript, Polyline, Marker, InfoWindow } from '@react-google-maps/api';

type Route = {
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

// Example UH Mānoa / Honolulu routes for demo
const routes: Route[] = [
  {
    id: 'campus-loop',
    name: 'Campus Loop',
    distanceKm: 3,
    color: '#2a9d8f',
    path: [
      { lat: 21.3005, lng: -157.8170 },
      { lat: 21.2989, lng: -157.8185 },
      { lat: 21.2979, lng: -157.8174 },
      { lat: 21.2996, lng: -157.8159 },
      { lat: 21.3005, lng: -157.8170 },
    ],
    start: { lat: 21.3005, lng: -157.8170 },
    end: { lat: 21.3005, lng: -157.8170 }, // loop
  },
  {
    id: 'valley-out-back',
    name: 'Valley Out & Back',
    distanceKm: 5,
    color: '#e76f51',
    path: [
      { lat: 21.3018, lng: -157.8175 },
      { lat: 21.3035, lng: -157.8190 },
      { lat: 21.3050, lng: -157.8200 },
      { lat: 21.3064, lng: -157.8215 },
      { lat: 21.3050, lng: -157.8200 },
      { lat: 21.3035, lng: -157.8190 },
      { lat: 21.3018, lng: -157.8175 },
    ],
    start: { lat: 21.3018, lng: -157.8175 },
    end: { lat: 21.3018, lng: -157.8175 }, // also loop
  },
];

// Helper: are two points the same?
function sameLatLng(
  a?: google.maps.LatLngLiteral,
  b?: google.maps.LatLngLiteral,
): boolean {
  if (!a || !b) return false;
  return a.lat === b.lat && a.lng === b.lng;
}

export default function RoutesMapGoogle() {
  // Center the map around the first route
  const center = useMemo(
    () => routes[0]?.path[0] ?? { lat: 21.3005, lng: -157.8170 },
    [],
  );

  const [selected, setSelected] = useState<SelectedMarker | null>(null);

  const handleMarkerClick = (
    routeId: string,
    position: google.maps.LatLngLiteral,
    type: 'start' | 'end',
  ) => {
    setSelected({ routeId, position, type });
  };

  const selectedRoute = selected
    ? routes.find((r) => r.id === selected.routeId)
    : undefined;

  return (
    <div style={{ width: '100%', height: '70vh', borderRadius: 12, overflow: 'hidden' }}>
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY as string}>
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
          {/* Route lines */}
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

          {/* Start / End markers with hover + click */}
          {routes.flatMap((route) => {
            const markers: JSX.Element[] = [];

            if (route.start) {
              markers.push(
                <Marker
                  key={`${route.id}-start`}
                  position={route.start}
                  label="S"
                  // Hover tooltip text:
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

          {/* Info popup when clicking marker */}
          {selected && selectedRoute && (
            <InfoWindow
              position={selected.position}
              onCloseClick={() => setSelected(null)}
            >
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
