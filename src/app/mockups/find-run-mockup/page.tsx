export default function FindRunMockupPage() {
  return (
    <div style={{ padding: '40px' }}>
      <h1>Find Run Page (Mockup)</h1>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px',
          marginTop: '30px',
        }}
      >
        {/* Card 1 */}
        <div
          style={{
            border: '2px dashed #777',
            padding: '20px',
            height: '180px',
          }}
        >
          <h3>[ Run Location ]</h3>
          <p>[ Distance ]</p>
          <p>[ Pace ]</p>
          <p>[ Difficulty ]</p>
        </div>

        {/* Card 2 */}
        <div
          style={{
            border: '2px dashed #777',
            padding: '20px',
            height: '180px',
          }}
        >
          <h3>[ Run Location ]</h3>
          <p>[ Distance ]</p>
          <p>[ Pace ]</p>
          <p>[ Difficulty ]</p>
        </div>

        {/* Card 3 */}
        <div
          style={{
            border: '2px dashed #777',
            padding: '20px',
            height: '180px',
          }}
        >
          <h3>[ Run Location ]</h3>
          <p>[ Distance ]</p>
          <p>[ Pace ]</p>
          <p>[ Difficulty ]</p>
        </div>
      </div>
    </div>
  );
}
