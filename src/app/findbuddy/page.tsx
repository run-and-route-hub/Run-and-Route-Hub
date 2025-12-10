'use client';

import React, { useEffect, useState } from 'react';

type TimeOfDay = 'Morning' | 'Afternoon' | 'Evening';
type Terrain = 'Flat' | 'Hills' | 'Mixed';

type ApiPartner = {
  id: number;
  email: string;
  displayName: string | null;
  location: string | null;
  paceMin: number | null;
  paceMax: number | null;
  preferredDistanceKm: number | null;
  terrainPreference: Terrain | null;
  bio: string | null;
  daysAvailable: string[];
  prefersMorning: boolean;
  prefersAfternoon: boolean;
  prefersEvening: boolean;
};

type Partner = {
  id: string;
  name: string;
  paceMin: number;
  paceMax: number;
  days: string[];
  times: TimeOfDay[];
  preferredDistanceKm: number;
  bio: string;
  terrain: Terrain;
};

const ALL_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const ALL_TIMES: TimeOfDay[] = ['Morning', 'Afternoon', 'Evening'];
const ALL_TERRAINS: Terrain[] = ['Flat', 'Hills', 'Mixed'];

function mapApiToPartner(user: ApiPartner): Partner | null {
  if (
    user.paceMin === null
    || user.paceMax === null
    || user.preferredDistanceKm === null
    || user.terrainPreference === null
  ) {
    return null;
  }

  const times: TimeOfDay[] = [];
  if (user.prefersMorning) times.push('Morning');
  if (user.prefersAfternoon) times.push('Afternoon');
  if (user.prefersEvening) times.push('Evening');

  return {
    id: String(user.id),
    name: user.displayName || user.email.split('@')[0],
    paceMin: user.paceMin,
    paceMax: user.paceMax,
    days: user.daysAvailable ?? [],
    times,
    preferredDistanceKm: user.preferredDistanceKm,
    bio: user.bio || 'Runner from the community.',
    terrain: user.terrainPreference,
  };
}

export default function PartnersPage() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [minPace, setMinPace] = useState<number | ''>('');
  const [maxPace, setMaxPace] = useState<number | ''>('');
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedTimes, setSelectedTimes] = useState<TimeOfDay[]>([]);
  const [selectedTerrains, setSelectedTerrains] = useState<Terrain[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/partners');
        if (!res.ok) {
          throw new Error('Failed to load partners');
        }
        const data: ApiPartner[] = await res.json();
        const mapped = data
          .map(mapApiToPartner)
          .filter((p): p is Partner => p !== null);
        setPartners(mapped);
      } catch (e) {
        setError('Could not load running buddies. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  const toggleDay = (day: string) => {
    setSelectedDays((prev) => (prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]));
  };

  const toggleTime = (time: TimeOfDay) => {
    setSelectedTimes((prev) => (prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time]));
  };

  const toggleTerrain = (terrain: Terrain) => {
    setSelectedTerrains((prev) => (prev.includes(terrain)
      ? prev.filter((t) => t !== terrain)
      : [...prev, terrain]));
  };

  const filteredPartners = partners.filter((partner) => {
    const paceOK = (minPace === '' && maxPace === '')
      || ((minPace === '' || partner.paceMax >= minPace)
        && (maxPace === '' || partner.paceMin <= maxPace));

    const daysOK = selectedDays.length === 0
      || selectedDays.some((day) => partner.days.includes(day));

    const timesOK = selectedTimes.length === 0
      || selectedTimes.some((time) => partner.times.includes(time));

    const terrainOK = selectedTerrains.length === 0
      || selectedTerrains.includes(partner.terrain);

    return paceOK && daysOK && timesOK && terrainOK;
  });

  return (
    <main style={{ padding: '1.5rem', maxWidth: 1000, margin: '0 auto' }}>
      <header style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
        <h1
          style={{
            fontSize: '2rem',
            fontWeight: 700,
            marginBottom: '0.25rem',
          }}
        >
          Find Running Buddy
        </h1>
        <p style={{ color: '#555', maxWidth: 650, margin: '0 auto' }}>
          Match with runners who have a similar pace, availability, and terrain
          preference using real profiles stored in our database.
        </p>
      </header>

      {/* Filters */}
      <section
        style={{
          border: '1px solid #e0e0e0',
          borderRadius: '0.75rem',
          padding: '1rem 1.25rem',
          marginBottom: '1.5rem',
          backgroundColor: '#fff',
        }}
      >
        <h2
          style={{
            fontSize: '1.1rem',
            fontWeight: 600,
            marginBottom: '0.75rem',
          }}
        >
          Filters
        </h2>

        {/* Pace filter */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '1rem',
          }}
        >
          <div>
            <p
              style={{
                fontSize: '0.9rem',
                marginBottom: 4,
                fontWeight: 500,
              }}
            >
              Min pace (min/km)
            </p>
            <input
              aria-label="Min pace (minutes per kilometer)"
              type="number"
              step="0.1"
              value={minPace}
              onChange={(e) => setMinPace(e.target.value === '' ? '' : Number(e.target.value))}
              style={{
                display: 'block',
                marginTop: 4,
                padding: '0.35rem 0.5rem',
                borderRadius: '0.5rem',
                border: '1px solid #ccc',
                minWidth: 120,
              }}
            />
          </div>

          <div>
            <p
              style={{
                fontSize: '0.9rem',
                marginBottom: 4,
                fontWeight: 500,
              }}
            >
              Max pace (min/km)
            </p>
            <input
              aria-label="Max pace (minutes per kilometer)"
              type="number"
              step="0.1"
              value={maxPace}
              onChange={(e) => setMaxPace(e.target.value === '' ? '' : Number(e.target.value))}
              style={{
                display: 'block',
                marginTop: 4,
                padding: '0.35rem 0.5rem',
                borderRadius: '0.5rem',
                border: '1px solid #ccc',
                minWidth: 120,
              }}
            />
          </div>
        </div>

        {/* Availability: Days */}
        <div style={{ marginBottom: '1rem' }}>
          <p
            style={{
              fontSize: '0.9rem',
              marginBottom: '0.5rem',
              fontWeight: 500,
            }}
          >
            Days you&apos;re available
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {ALL_DAYS.map((day) => {
              const active = selectedDays.includes(day);
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => toggleDay(day)}
                  style={{
                    padding: '0.3rem 0.7rem',
                    borderRadius: '999px',
                    border: active ? '1px solid #111' : '1px solid #ccc',
                    background: active ? '#3e633e' : '#fff',
                    color: active ? '#fff' : '#333',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                  }}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>

        {/* Availability: Time of day */}
        <div style={{ marginBottom: '1rem' }}>
          <p
            style={{
              fontSize: '0.9rem',
              marginBottom: '0.5rem',
              fontWeight: 500,
            }}
          >
            Time of day
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {ALL_TIMES.map((time) => {
              const active = selectedTimes.includes(time);
              return (
                <button
                  key={time}
                  type="button"
                  onClick={() => toggleTime(time)}
                  style={{
                    padding: '0.35rem 0.8rem',
                    borderRadius: '999px',
                    border: active ? '1px solid #111' : '1px solid #ccc',
                    background: active ? '#3e633e' : '#fff',
                    color: active ? '#fff' : '#333',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                  }}
                >
                  {time}
                </button>
              );
            })}
          </div>
        </div>

        {/* Terrain preference */}
        <div>
          <p
            style={{
              fontSize: '0.9rem',
              marginBottom: '0.5rem',
              fontWeight: 500,
            }}
          >
            Terrain preference
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {ALL_TERRAINS.map((terrain) => {
              const active = selectedTerrains.includes(terrain);
              return (
                <button
                  key={terrain}
                  type="button"
                  onClick={() => toggleTerrain(terrain)}
                  style={{
                    padding: '0.35rem 0.8rem',
                    borderRadius: '999px',
                    border: active ? '1px solid #111' : '1px solid #ccc',
                    background: active ? '#3e633e' : '#fff',
                    color: active ? '#fff' : '#333',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                  }}
                >
                  {terrain}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Results */}
      <section>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '0.75rem',
            alignItems: 'baseline',
          }}
        >
          <h2 style={{ fontSize: '1.1rem', fontWeight: 600 }}>
            Matching Buddies
          </h2>
          <span style={{ fontSize: '0.85rem', color: '#666' }}>
            {filteredPartners.length} result
            {filteredPartners.length === 1 ? '' : 's'}
          </span>
        </div>

        {loading && <p style={{ color: '#777' }}>Loading buddies…</p>}
        {error && !loading && (
          <p style={{ color: '#b00020' }}>{error}</p>
        )}

        {!loading && !error && filteredPartners.length === 0 ? (
          <p style={{ color: '#777' }}>
            No matching buddies yet. Try adjusting your filters.
          </p>
        ) : null}

        {!loading && !error && filteredPartners.length > 0 && (
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {filteredPartners.map((partner) => (
              <li
                key={partner.id}
                style={{
                  border: '1px solid #e0e0e0',
                  borderRadius: '0.75rem',
                  padding: '1rem 1.25rem',
                  marginBottom: '0.75rem',
                  backgroundColor: '#fff',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    marginBottom: '0.35rem',
                  }}
                >
                  <h3
                    style={{
                      fontSize: '1rem',
                      fontWeight: 600,
                      margin: 0,
                    }}
                  >
                    {partner.name}
                  </h3>
                  <span
                    style={{
                      fontSize: '0.85rem',
                      color: '#444',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {partner.paceMin.toFixed(1)}–{partner.paceMax.toFixed(1)} min/km •{' '}
                    {partner.preferredDistanceKm} km
                  </span>
                </div>

                <p
                  style={{
                    margin: '0 0 0.35rem 0',
                    fontSize: '0.9rem',
                    color: '#555',
                  }}
                >
                  {partner.bio}
                </p>

                <p
                  style={{
                    margin: 0,
                    fontSize: '0.85rem',
                    color: '#666',
                  }}
                >
                  <strong>Runs on:</strong> {partner.days.join(', ')} •{' '}
                  {partner.times.join(', ')}
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: '0.85rem',
                    color: '#666',
                  }}
                >
                  <strong>Terrain:</strong> {partner.terrain}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
