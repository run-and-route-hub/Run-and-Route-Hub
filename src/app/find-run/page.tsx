'use client';

import React, { useState } from 'react';

export default function FindRunPage() {
  const [difficulty, setDifficulty] = useState('');
  const [minDistance, setMinDistance] = useState('');
  const [pace, setPace] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchRuns = async () => {
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
