'use client';

import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import swal from 'sweetalert';
import { Route, Location } from '@prisma/client';
import { EditRouteSchema } from '@/lib/validationSchemas';
import { editRoute } from '@/lib/dbActions';

interface EditRouteFormProps {
  route: Route & { path: Location[] };
}

interface RouteFormInput {
  name: string;
}

const getStraightLineDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a = Math.sin(dLat / 2) ** 2
    + Math.cos((lat1 * Math.PI) / 180)
      * Math.cos((lat2 * Math.PI) / 180)
      * Math.sin(dLon / 2) ** 2;
  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
};

const EditRouteForm: React.FC<EditRouteFormProps> = ({ route }) => {
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm<RouteFormInput>({
    resolver: yupResolver(EditRouteSchema.pick(['name'])),
    defaultValues: { name: route.name },
  });

  const [routeData, setRouteData] = useState<{
    start: Location | null;
    end: Location | null;
    path: Location[];
  }>({
    start: route.path[0] ?? null,
    end: route.path[route.path.length - 1] ?? null,
    path: route.path ?? [],
  });

  const [selectionMode, setSelectionMode] = useState<'start' | 'end' | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = (key: 'start' | 'end', value: { lat: number; lng: number }) => {
    setRouteData(prev => ({ ...prev, [key]: value }));
  };

  const handleMapClick = useCallback((e: google.maps.MapMouseEvent) => {
    if (!selectionMode || !e.latLng) return;
    update(selectionMode, { lat: e.latLng.lat(), lng: e.latLng.lng() });
    setSelectionMode(null);
  }, [selectionMode]);

  const onSubmit: SubmitHandler<RouteFormInput> = async (formData) => {
    if (!routeData.start || !routeData.end) {
      setError('Please select start and end points on the map.');
      return;
    }
    setLoading(true);

    const pathList = [routeData.start, ...routeData.path, routeData.end];

    let distanceKm = 0;
    for (let i = 0; i < pathList.length - 1; i++) {
      distanceKm += getStraightLineDistance(
        pathList[i].lat,
        pathList[i].lng,
        pathList[i + 1].lat,
        pathList[i + 1].lng,
      );
    }
    const distanceMile = distanceKm * 0.621371;

    try {
      await editRoute({
        id: route.id,
        name: formData.name,
        distanceKm,
        distanceMile,
        path: pathList,
      });
      swal('Success', 'Route has been updated', 'success', { timer: 2000 });
      router.push('/routes');
    } catch (err: any) {
      setError(err?.message || 'An error occurred');
      setLoading(false);
    }
  };

  return (
    <main style={{ maxWidth: 720, margin: '2rem auto', padding: '0 1rem' }}>
      <h1>Edit Route</h1>
      <form onSubmit={handleSubmit(onSubmit)} aria-describedby="form-error">
        <label>
          Name
          <input
            {...register('name')}
            placeholder="Route name"
            style={{ display: 'block', width: '100%', padding: 8, marginTop: 6 }}
          />
        </label>
        {errors.name && <p style={{ color: 'crimson' }}>{errors.name.message}</p>}

        <div style={{ marginTop: 12 }}>
          <p>
            {routeData.start
              ? `Start: (${routeData.start.lat.toFixed(4)}, ${routeData.start.lng.toFixed(4)})`
              : 'Select start point'}
            <br />
            {routeData.end
              ? `End: (${routeData.end.lat.toFixed(4)}, ${routeData.end.lng.toFixed(4)})`
              : 'Select end point'}
          </p>

          {selectionMode === null && (
            <>
              <button type="button" onClick={() => setSelectionMode('start')}>
                {routeData.start ? 'Change Start' : 'Select Start'}
              </button>
              <button
                type="button"
                onClick={() => setSelectionMode('end')}
                disabled={!routeData.start}
              >
                {routeData.end ? 'Change End' : 'Select End'}
              </button>
              {(routeData.start || routeData.end) && (
                <button
                  type="button"
                  onClick={() => setRouteData({ start: null, end: null, path: [] })}
                >
                  Clear Both
                </button>
              )}
            </>
          )}

          {selectionMode && <p>Click on the map to select {selectionMode.toUpperCase()} point</p>}
        </div>

        <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!}>
          <GoogleMap
            mapContainerStyle={{ width: '100%', height: '400px', borderRadius: 4, marginTop: 8 }}
            center={routeData.start ?? { lat: 21.3005, lng: -157.817 }}
            zoom={15}
            onClick={handleMapClick}
          >
            {routeData.start && <Marker position={routeData.start} label="S" />}
            {routeData.end && <Marker position={routeData.end} label="E" />}
          </GoogleMap>
        </LoadScript>

        {error && <div style={{ color: 'crimson', marginTop: 12 }}>{error}</div>}

        <button type="submit" disabled={loading} style={{ marginTop: 12 }}>
          {loading ? 'Saving…' : 'Save Changes'}
        </button>
      </form>
    </main>
  );
};

export default EditRouteForm;
