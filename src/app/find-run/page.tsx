'use client';
import React, { useState } from 'react';

export default function FindRunPage() {
  const [difficulty, setDifficulty] = useState('');
  const [minDistance, setMinDistance] = useState('');
  const [pace, setPace] = useState('');

  const fetchRuns = () => {
    console.log('Searching with filters:');
    console.log('Difficulty:', difficulty);
    console.log('Min Distance:', minDistance);
    console.log('Pace:', pace);
    // TODO: Replace this with actual fetch call to your backend or API
  };

  return (
    <main>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px' }}>
        {/* Page Title */}
        <h1 style={{ fontSize: '36px', fontWeight: 'bold', textAlign: 'center', marginBottom: '20px' }}>
          Find Run Page
        </h1>

        {/* Explanation Section */}
        <div style={{ marginBottom: '40px', textAlign: 'center' }}>
          <p style={{ fontSize: '18px', color: '#4B5563' }}>
            Browse available runs submitted by other users. Each run includes a location, distance, pace, and estimated difficulty. Use the filters below to find runs that match your preferences.
          </p>
        </div>

        {/* Filter Section */}
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
            {/* Difficulty */}
            <div>
              <label htmlFor="difficulty" style={{ display: 'block', fontWeight: '500', marginBottom: '5px' }}>
                Difficulty Level:
              </label>
              <select
                id="difficulty"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                style={{
                  marginLeft: '15px',
                  padding: '8px',
                  borderRadius: '6px',
                  textAlign: 'center',
                  width: '80%',
                }}
              >
                <option value="">Any</option>
                <option value="easy">Easy</option>
                <option value="moderate">Moderate</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            {/* Minimum Distance */}
            <div>
              <label htmlFor="minDistance" style={{ display: 'block', fontWeight: '500', marginBottom: '5px' }}>
                Minimum Distance:
              </label>
              <select
                id="minDistance"
                value={minDistance}
                onChange={(e) => setMinDistance(e.target.value)}
                style={{
                  marginLeft: '15px',
                  padding: '8px',
                  borderRadius: '6px',
                  textAlign: 'center',
                  width: '80%',
                }}
              >
                <option value="">Any</option>
                <option value="1">1 mile</option>
                <option value="2">2 miles</option>
                <option value="3">3 miles</option>
                <option value="4">4 miles</option>
                <option value="5">5 miles</option>
              </select>
            </div>

            {/* Preferred Pace */}
            <div>
              <label htmlFor="pace" style={{ display: 'block', fontWeight: '500', marginBottom: '5px' }}>
                Preferred Pace:
              </label>
              <select
                id="pace"
                value={pace}
                onChange={(e) => setPace(e.target.value)}
                style={{
                  marginLeft: '15px',
                  padding: '8px',
                  borderRadius: '6px',
                  textAlign: 'center',
                  width: '80%',
                }}
              >
                <option value="">Any</option>
                <option value="slow">Slow</option>
                <option value="moderate">Moderate</option>
                <option value="fast">Fast</option>
              </select>
            </div>
          </div>

          {/* Search Button */}
          <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <button
              onClick={fetchRuns}
              style={{
                padding: '10px 24px',
                fontSize: '16px',
                borderRadius: '6px',
                backgroundColor: '#0070f3',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Search
            </button>
          </div>
        </div>

        {/* Placeholder for Run Cards */}
        <div style={{ marginTop: '40px', textAlign: 'center', color: '#9CA3AF' }}>
          <p>Run results will appear here after you search.</p>
        </div>
      </div>
    </main>
  );
}
