export default function FindRunMockupPage() {
  return (
    <main>
      <div style={{ maxWidth: '96rem', margin: '0 auto', padding: '2.5rem 1.5rem' }}>
        {/* Page Title */}
        <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '2rem' }}>Find Run Page</h1>

        {/* Explanation Section */}
        <div style={{ marginBottom: '2.5rem' }}>
          <p style={{ fontSize: '1.125rem', color: '#374151' }}>
            Explore available running routes submitted by other users.
            Each run includes details such as location, distance, pace,
            and difficulty level—all sourced from the live database.
          </p>
        </div>

        {/* Filter Section */}
        <div style={{ marginBottom: '3.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem' }}>Filter Runs</h2>

          {/* Difficulty */}
          <div style={{ marginBottom: '16px' }}>
            <label htmlFor="difficulty" style={{ fontWeight: '500', color: '#1f2937' }}>
              Difficulty Level:
            </label>
            <select
              id="difficulty"
              style={{
                marginLeft: '15px',
                padding: '8px',
                borderRadius: '6px',
                textAlign: 'center',
              }}
            >
              <option>Any</option>
              <option>Easy</option>
              <option>Moderate</option>
              <option>Hard</option>
            </select>
          </div>

          {/* Minimum Distance */}
          <div style={{ marginBottom: '16px' }}>
            <label htmlFor="minDistance" style={{ fontWeight: '500', color: '#1f2937' }}>
              Minimum Distance:
            </label>
            <select
              id="minDistance"
              style={{
                marginLeft: '15px',
                padding: '8px',
                borderRadius: '6px',
                textAlign: 'center',
              }}
            >
              <option>Any</option>
              <option>1 mile</option>
              <option>2 miles</option>
              <option>3 miles</option>
              <option>4 miles</option>
              <option>5 miles</option>
            </select>
          </div>

          {/* Preferred Pace */}
          <div style={{ marginBottom: '16px' }}>
            <label htmlFor="pace" style={{ fontWeight: '500', color: '#1f2937' }}>
              Preferred Pace:
            </label>
            <select
              id="pace"
              style={{
                marginLeft: '15px',
                padding: '8px',
                borderRadius: '6px',
                textAlign: 'center',
              }}
            >
              <option>Any</option>
              <option>Slow</option>
              <option>Moderate</option>
              <option>Fast</option>
            </select>
          </div>
        </div>

        {/* Run Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
          }}
        >
          {[1, 2, 3].map((_, idx) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={idx}>
              <div
                style={{
                  border: '1px solid #d1d5db',
                  padding: '1.5rem',
                  borderRadius: '1rem',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                  transition: 'box-shadow 0.2s ease',
                }}
              >
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.75rem' }}>
                  Run Location
                </h3>

                <p style={{ color: '#374151' }}>
                  Distance:
                  <span style={{ fontWeight: '500' }}> X miles </span>
                </p>

                <p style={{ color: '#374151' }}>
                  Pace:
                  <span style={{ fontWeight: '500' }}> XX:XX </span>
                </p>

                <p style={{ color: '#374151' }}>
                  Difficulty:
                  <span style={{ fontWeight: '500' }}> Level </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
