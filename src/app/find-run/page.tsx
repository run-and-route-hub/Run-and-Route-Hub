'use client';

import React, { useState } from 'react';

export default function FindRunPage() {
  const [difficulty, setDifficulty] = useState('');
  const [minDistance, setMinDistance] = useState('');
  const [pace, setPace] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false); //

  /* const fetchRuns = async () => {
    setLoading(true);
    try {
      console.log('Sending to API:', {
        difficulty: difficulty.toLowerCase(),
        minDistance,
        pace: pace.toLowerCase(),
      });

      const res = await fetch('/api/filter-runs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          difficulty: difficulty.toLowerCase(),
          minDistance,
          pace: pace.toLowerCase(),
        }),
      });

      if (!res.ok) throw new Error('API call failed');

      const data = await res.json();
      setResults(data.runs || []); // Assumes your backend returns just an array, not { runs: [...] }
    } catch (err) {
      console.error('Fetch error:', err);
      setResults([]);
    }
    setLoading(false);
  }; */

  // SAFE STATIC ROUTES — Does NOT touch the database
  const staticRuns = [
    { location: 'Kapiolani Park', distance: 3, pace: 'moderate', difficulty: 'easy' },
    { location: 'Diamond Head Trail', distance: 5, pace: 'fast', difficulty: 'hard' },
    { location: 'Ala Moana Beach Park', distance: 4, pace: 'slow', difficulty: 'moderate' },
    { location: 'Manoa Valley Loop', distance: 3, pace: 'moderate', difficulty: 'moderate' },
    { location: 'Diamond Head (Short Trail)', distance: 2, pace: 'fast', difficulty: 'hard' },
    { location: 'Tantalus Drive', distance: 5, pace: 'slow', difficulty: 'hard' },
    { location: 'Ala Moana Beach Path', distance: 2, pace: 'slow', difficulty: 'easy' },
    { location: 'Kapiolani Park Loop', distance: 3, pace: 'moderate', difficulty: 'easy' },
    { location: 'Magic Island Loop', distance: 2, pace: 'slow', difficulty: 'easy' },
    { location: 'Kakaako Waterfront Path', distance: 3, pace: 'moderate', difficulty: 'easy' },
    { location: 'Waikiki Strip Run', distance: 2, pace: 'slow', difficulty: 'easy' },
    { location: 'UH Manoa Campus Loop', distance: 2, pace: 'moderate', difficulty: 'moderate' },
    { location: 'Makiki Valley Trail', distance: 4, pace: 'slow', difficulty: 'hard' },
    { location: 'Puu Ualakaa Park Path', distance: 2, pace: 'slow', difficulty: 'moderate' },
    { location: 'Manoa Falls Trail', distance: 3, pace: 'slow', difficulty: 'hard' },
    { location: 'Kuliouou Ridge Trail', distance: 5, pace: 'slow', difficulty: 'hard' },
    { location: 'Hawaii Kai Marina Loop', distance: 4, pace: 'moderate', difficulty: 'easy' },
    { location: 'Waialae Beach Run', distance: 2, pace: 'slow', difficulty: 'easy' },
    { location: 'Makapuu Lighthouse Trail', distance: 2, pace: 'moderate', difficulty: 'moderate' },
    { location: 'Sandy Beach Path', distance: 3, pace: 'slow', difficulty: 'easy' },
    { location: 'Kaneohe Bay Waterfront Path', distance: 5, pace: 'moderate', difficulty: 'easy' },
    { location: 'Hauula Loop Trail', distance: 4, pace: 'slow', difficulty: 'moderate' },
    { location: 'Lanikai Pillbox Trail', distance: 1, pace: 'slow', difficulty: 'hard' },
    { location: 'Pearl Harbor Bike Path', distance: 10, pace: 'moderate', difficulty: 'moderate' },
    { location: 'Aiea Loop Trail', distance: 4, pace: 'slow', difficulty: 'hard' },
    { location: 'Koko Head Railway Steps', distance: 1, pace: 'slow', difficulty: 'hard' },
    { location: 'Ala Wai Canal Path', distance: 4, pace: 'slow', difficulty: 'easy' },
    { location: 'Chaminade Campus Loop', distance: 1, pace: 'slow', difficulty: 'easy' },
    { location: 'Moanalua Valley Trail', distance: 6, pace: 'slow', difficulty: 'hard' },
    { location: 'Kaena Point Trail', distance: 5, pace: 'slow', difficulty: 'moderate' },
    { location: 'Honolulu Harbor Front', distance: 3, pace: 'moderate', difficulty: 'easy' },
    { location: 'Kaimuki Neighborhood Loop', distance: 2, pace: 'moderate', difficulty: 'easy' },
  ];

  const fetchRuns = () => {
    setLoading(true);

    const filtered = staticRuns.filter((run) => {
      const matchDifficulty = !difficulty || difficulty === '' || run.difficulty.toLowerCase() === difficulty.toLowerCase();

      const matchPace = !pace || pace === '' || run.pace.toLowerCase() === pace.toLowerCase();

      const matchMinDistance = !minDistance || minDistance === '' || run.distance >= Number(minDistance);

      return matchDifficulty && matchPace && matchMinDistance;
    });

    setResults(filtered);
    setLoading(false);
  };

  return (
    <main>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px' }}>
        <h1 style={{ fontSize: '36px', fontWeight: 'bold', textAlign: 'center', marginBottom: '20px' }}>
          Find Run Page
        </h1>

        <div style={{ marginBottom: '40px', textAlign: 'center' }}>
          <p style={{ fontSize: '18px', color: '#4B5563' }}>
            Browse available runs submitted by other users.
            Each run includes a location, distance, pace, and difficulty.
          </p>
        </div>

        {/* Filters */}
        <div style={{ marginBottom: '30px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '15px', textAlign: 'center' }}>
            Filter Runs
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '24px',
              justifyContent: 'center',
            }}
          >
            <div>
              <label htmlFor="difficulty" style={{ display: 'block', fontWeight: '500', marginBottom: '5px' }}>
                Difficulty:
              </label>
              <select
                id="difficulty"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                style={{ width: '80%', padding: '8px' }}
              >
                <option value="">Any</option>
                <option value="easy">Easy</option>
                <option value="moderate">Moderate</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            <div>
              <label htmlFor="minDistance" style={{ display: 'block', fontWeight: '500', marginBottom: '5px' }}>
                Minimum Distance:
              </label>
              <select
                id="minDistance"
                value={minDistance}
                onChange={(e) => setMinDistance(e.target.value)}
                style={{ width: '80%', padding: '8px' }}
              >
                <option value="">Any</option>
                <option value="1">1 mile</option>
                <option value="2">2 miles</option>
                <option value="3">3 miles</option>
                <option value="4">4 miles</option>
              </select>
            </div>

            <div>
              <label htmlFor="pace" style={{ display: 'block', fontWeight: '500', marginBottom: '5px' }}>
                Preferred Pace:
              </label>
              <select
                id="pace"
                value={pace}
                onChange={(e) => setPace(e.target.value)}
                style={{ width: '80%', padding: '8px' }}
              >
                <option value="">Any</option>
                <option value="slow">Slow</option>
                <option value="moderate">Moderate</option>
                <option value="fast">Fast</option>
              </select>
            </div>
          </div>

          {/* Button */}
          <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <button
              onClick={fetchRuns}
              style={{
                padding: '10px 24px',
                fontSize: '16px',
                backgroundColor: '#0070f3',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </div>

        {/* Results */}
        <div style={{ marginTop: '40px' }}>
          {results.length > 0 ? (
            results.map((run, index) => (
              <div key={index} style={{ border: '1px solid #ccc', padding: '16px', borderRadius: '6px', marginBottom: '16px' }}>
                <strong>{run.location}</strong> — {run.distance} miles, {run.pace} pace, {run.difficulty} difficulty
              </div>
            ))
          ) : (
            <p style={{ textAlign: 'center', color: '#9CA3AF' }}>
              {loading ? 'Loading...' : 'No results found. Try adjusting your filters.'}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
