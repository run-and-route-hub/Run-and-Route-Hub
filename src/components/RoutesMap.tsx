'use client';

import { GoogleMap, LoadScript, Polyline, Marker } from '@react-google-maps/api';
import { useMemo } from 'react';

type Route = {
  id: string;
  name: string;
  color?: string;
  path: google.maps.LatLngLiteral[];
  start?: google.maps.LatLngLiteral;
  end?: google.maps.LatLngLiteral;
};

// Example UH Mānoa test routes
const routes: Route[] = [
  {
    id: 'campus-loop',
    name: 'Campus Loop (3km)',
    color: '#2a9d8f',
    path: [
      { lat: 21.3005, lng: -157.8170 },
      { lat: 21.2989, lng: -157.8185 },
      { lat: 21.2979, lng: -157.8174 },
      { lat: 21.2996, lng: -157.8159 },
      { lat: 21.3005, lng: -157.8170 },
    ],
    start: { lat: 21.3005, lng: -157.8170 },
    end: { lat: 21.3005, lng: -157.8170 },
  },
  {
    id: 'valley-out-back',
    name: 'Valley Out & Back (5km)',
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
    end: { lat: 21.3018, lng: -157.8175 },
  },
];

export default function RoutesMapGoogle() {
  const center = useMemo(() => ({ lat: 21.3005, lng: -157.8170 }), []);

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!}>
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '70vh', borderRadius: '12px' }}
        center={center}
        zoom={15}
      >
        {routes.map((r) => (
          <Polyline
            key={r.id}
            path={r.path}
            options={{ strokeColor: r.color ?? '#1d4ed8', strokeWeight: 4 }}
          />
        ))}
        {routes.map((r) => (
          <>
            {r.start && <Marker key={`${r.id}-start`} position={r.start} label="S" />}
            {r.end && <Marker key={`${r.id}-end`} position={r.end} label="E" />}
          </>
        ))}
      </GoogleMap>
    </LoadScript>
  );
}
