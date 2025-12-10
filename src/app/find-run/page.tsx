'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function FindRunPage() {
  const router = useRouter();
  const [minDistance, setMinDistance] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchRuns = async () => {
    setLoading(true);
    try {
      console.log('Sending to API:', {
        minDistance: minDistance || 'Any',
      });

      const res = await fetch('/api/filter-runs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          minDistance: minDistance || 'Any',
        }),
      });

      if (!res.ok) throw new Error('API call failed');

      const data = await res.json();
      console.log('Received from API:', data);
      setResults(data.runs || []);
    } catch (err) {
      console.error('Fetch error:', err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRuns();
  }, []);

  const handleRouteClick = (routeId: number) => {
    router.push(`/route/${routeId}`);
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
            Each run includes a location and distance.
          </p>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '15px', textAlign: 'center' }}>
            Filter Runs
          </h2>

          <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <label htmlFor="minDistance" style={{ display: 'block', fontWeight: '500', marginBottom: '5px' }}>
              Minimum Distance (miles):
            </label>
            <input
              id="minDistance"
              type="number"
              value={minDistance}
              onChange={(e) => setMinDistance(e.target.value)}
              placeholder="Enter distance in miles (e.g., 2.5)"
              min="0"
              step="0.1"
              style={{ width: '50%', padding: '8px' }}
            />
          </div>

          <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <button
              onClick={fetchRuns}
              style={{
                padding: '0.3rem 0.7rem',
                borderRadius: '999px',
                fontSize: '0.85rem',
                cursor: 'pointer',
                marginRight: '1rem',
                backgroundColor: 'var(--rrh-green)',
                color: 'white',
                border: 'none',
              }}
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </div>

        <div style={{ marginTop: '40px' }}>
          {results.length > 0 ? (
            results.map((run) => (
              <button
                key={run.id}
                onClick={() => handleRouteClick(run.id)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  border: '1px solid #ccc',
                  padding: '16px',
                  borderRadius: '6px',
                  marginBottom: '16px',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                  backgroundColor: 'transparent',
                  fontSize: '16px',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <strong>{run.location}</strong> — {run.distanceMI?.toFixed(2) || 'N/A'} miles, {run.distanceKM?.toFixed(2) || 'N/A'} kilometers
              </button>
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
