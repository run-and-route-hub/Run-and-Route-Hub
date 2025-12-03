/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */

'use client';

import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import swal from 'sweetalert';
import { addRoute } from '@/lib/dbActions';
import { AddRouteSchema } from '@/lib/validationSchemas';

function getStraightLineDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // Radius of the Earth in kilometers (you can use 3959 for miles)

  // Convert degrees to radians
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
    + Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c; // Distance in kilometers

  return distance;
}

const AddRouteForm: React.FC = () => {
  // console.log('AddStuffForm', status, session);
  const {
    register,
    handleSubmit: rhfHandleSubmit,
    reset,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(
      Yup.object({
        name: Yup.string().required('Route name is required'),
      }),
    ),
  });
  const router = useRouter();
  const [route, setRoute] = useState<Record<string, any>>({
    name: '',
    start: null,
    end: null,
    path: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectionMode, setSelectionMode] = useState<'start' | 'end' | null>(null);

  function update(key: string, value: any) {
    setRoute((prev) => ({ ...prev, [key]: value }));
  }

  const handleMapClick = useCallback(
    (e: google.maps.MapMouseEvent) => {
      if (!selectionMode || !e.latLng) return;

      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      const coords = { lat, lng };

      if (selectionMode === 'start') {
        update('start', coords);
        setSelectionMode('end');
      } else if (selectionMode === 'end') {
        let newpath = route.path;
        newpath = newpath.length > 0 ? newpath : [];
        newpath.push(route.end);
        update('path', newpath);
        console.log('Updated path:', newpath);
      }
    },
    [selectionMode],
  );

  const handleFormSubmit = rhfHandleSubmit(async (formData: any) => {
    setError(null);

    if (!route.start || !route.end) {
      const errorMsg = 'Please provide a start location and an end location by clicking the map.';
      setError(errorMsg);
      console.error(errorMsg);
      return;
    }
    setLoading(true);
    const pathlist = route.path.map((value: { lat: any; lng: any }) => ({ lat: value.lat, lng: value.lng })) || [];
    pathlist.unshift({ lat: route.start.lat, lng: route.start.lng });
    pathlist.push({ lat: route.end.lat, lng: route.end.lng });
    let distanceKm = 0;
    for (let i = 0; i < pathlist.length - 1; i++) {
      distanceKm += getStraightLineDistance(pathlist[i].lat, pathlist[i].lng, pathlist[i + 1].lat, pathlist[i + 1].lng);
    }
    const distanceMile = distanceKm * 0.621371;
    try {
      // combine form data with map-selected coordinates
      const payload = {
        name: formData.name,
        distanceMile,
        distanceKm,
        path: pathlist,
      };

      await addRoute(payload);

      swal('Success', 'Route has been added', 'success', { timer: 2000 });
      reset();
      // addRoute server action redirects, but ensure client-side navigation fallback
      router.push('/routes');
    } catch (err: any) {
      setError(err?.message || 'An error occurred');
      setLoading(false);
    }
  });

  return (
    <main style={{ maxWidth: 720, margin: '2rem auto', padding: '0 1rem' }}>
      <h1>Add Route</h1>

      <form onSubmit={handleFormSubmit} aria-describedby="form-error">
        <div style={{ marginBottom: 12 }}>
          <label>
            Name
            <input
              type="text"
              {...register('name')}
              required
              placeholder="Morning loop"
              style={{ display: 'block', width: '100%', padding: 8, marginTop: 6 }}
            />
          </label>
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>
            Select Start and End Points on Map
            <div style={{ marginTop: 8, padding: 8, backgroundColor: '#f0f0f0', borderRadius: 4, marginBottom: 8 }}>
              <p style={{ margin: '0 0 8px 0', fontSize: 14 }}>
                {selectionMode === null ? (
                  <>
                    {route.start ? (
                      <span>
                        ✓ Start: (
                        {route.start.lat.toFixed(4)}
                        ,
                        {route.start.lng.toFixed(4)}
                        )
                        {' '}
                      </span>
                    ) : (
                      <span>Click &quot;Select Start&quot; to begin</span>
                    )}
                    {route.start && route.end && (
                      <span>
                        ✓ End: (
                        {route.end.lat.toFixed(4)}
                        ,
                        {route.end.lng.toFixed(4)}
                        )
                      </span>
                    )}
                  </>
                ) : (
                  <span>
                    Click on the map to select
                    {selectionMode === 'start' ? 'START' : 'END'}
                    {' '}
                    point
                  </span>
                )}
              </p>
              {selectionMode === null && (!route.start || !route.end) && (
                <button
                  type="button"
                  onClick={() => setSelectionMode('start')}
                  style={{
                    padding: '0.3rem 0.7rem',
                    borderRadius: '999px',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                  }}
                >
                  {route.start ? 'Change Start' : 'Select Start'}
                </button>
              )}
              {route.start && selectionMode === null && (
                <button
                  type="button"
                  onClick={() => setSelectionMode('end')}
                  style={{
                    padding: '0.3rem 0.7rem',
                    borderRadius: '999px',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                  }}
                >
                  {route.end ? 'Change End' : 'Select End'}

                </button>
              )}
              {(route.start || route.end) && (
                <button
                  type="button"
                  onClick={() => {
                    setRoute((prev) => ({ ...prev, start: null, end: null }));
                    setSelectionMode(null);
                  }}
                  style={{
                    padding: '0.3rem 0.7rem',
                    borderRadius: '999px',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                  }}
                >
                  Clear Both
                </button>
              )}
            </div>
          </label>

          <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!}>
            <GoogleMap
              mapContainerStyle={{ width: '100%', height: '400px', borderRadius: 4, marginBottom: 12 }}
              center={{ lat: 21.3005, lng: -157.817 }}
              zoom={15}
              onClick={handleMapClick}
            >
              {route.start && <Marker position={route.start} label="S" title="Start" />}
              {route.path.map((point: { lat: number; lng: number }, index: number) => (
                <Marker
                  key={`path-point-${index}`}
                  position={point}
                  label={`${index + 1}`}
                  title={`Path Point ${index + 1}`}
                />
              ))}
              {route.end && <Marker position={route.end} label="E" title="End" />}
            </GoogleMap>
          </LoadScript>
        </div>

        {error && (
          <div id="form-error" role="alert" style={{ color: 'crimson', marginBottom: 12 }}>
            {error}
          </div>
        )}

        <div>
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '0.3rem 0.7rem',
              borderRadius: '999px',
              fontSize: '0.85rem',
              cursor: 'pointer',
              marginRight: '1rem',
            }}

          >

            {loading ? 'Saving…' : 'Create Route'}

          </button>
          <button
            type="button"
            onClick={() => router.back()}
            style={{
              padding: '0.3rem 0.7rem',
              borderRadius: '999px',
              fontSize: '0.85rem',
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </main>
  );
};
export default AddRouteForm;
