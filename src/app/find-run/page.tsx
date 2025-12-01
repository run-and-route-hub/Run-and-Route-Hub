export default function FindRunPage() {
  return (
    <main>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 20px' }}>
        {/* Centered Section */}
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto', marginBottom: '3rem' }}>
          {/* Title */}
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Find Run</h1>

          {/* Description */}
          <p style={{ fontSize: '1.125rem', color: '#4B5563', marginBottom: '2rem' }}>
            Explore available running routes submitted by other users. Each run includes details such as
            location, distance, pace, and difficulty level—all sourced from the live database.
          </p>

          {/* Filters */}
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>Filter Runs</h2>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
              {/* Difficulty */}
              <div>
                <label htmlFor="difficulty" style={{ fontWeight: '500', color: '#1f2937' }}>
                  Difficulty Level:
                  <select
                    id="difficulty"
                    style={{ marginLeft: '15px', padding: '8px', borderRadius: '6px', textAlign: 'center' }}
                  >
                    <option>Any</option>
                    <option>Easy</option>
                    <option>Moderate</option>
                    <option>Hard</option>
                  </select>
                </label>
              </div>

              {/* Minimum Distance */}
              <div>
                <label htmlFor="minDistance" style={{ fontWeight: '500', color: '#1f2937' }}>
                  Minimum Distance:
                  <select
                    id="minDistance"
                    style={{ marginLeft: '15px', padding: '8px', borderRadius: '6px', textAlign: 'center' }}
                  >
                    <option>Any</option>
                    <option>1 mile</option>
                    <option>2 miles</option>
                    <option>3 miles</option>
                    <option>4 miles</option>
                    <option>5 miles</option>
                  </select>
                </label>
              </div>

              {/* Preferred Pace */}
              <div>
                <label htmlFor="pace" style={{ fontWeight: '500', color: '#1f2937' }}>
                  Preferred Pace:
                  <select
                    id="pace"
                    style={{ marginLeft: '15px', padding: '8px', borderRadius: '6px', textAlign: 'center' }}
                  >
                    <option>Any</option>
                    <option>Slow</option>
                    <option>Moderate</option>
                    <option>Fast</option>
                  </select>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Run Cards (Left-aligned Grid) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '20px',
          }}
        >
          {[1, 2, 3].map((_, i) => (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              style={{
                padding: '20px',
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                backgroundColor: 'white',
              }}
            >
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '10px' }}>
                Run Location
              </h3>
              <p>Distance: X miles</p>
              <p>Pace: XX:XX</p>
              <p>Difficulty: Level</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
