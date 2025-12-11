'use client';

import ProfileHeader from './ProfileHeader';
import StatsOverview from './StatsOverview';

export default function ProfilePage() {
  const user = {
    name: 'John Foo',
    username: 'john_foo',
    bio: 'UH Mānoa student · Training for a sub-20 5K and exploring routes across Mānoa Valley.',
    avatarUrl: '/profile/john.jpg',
    location: 'Manoa Valley, Oʻahu',
    joinedDate: 'Nov 2025',
  };

  const stats = {
    totalMilesMonth: 42.7,
    totalRunsMonth: 11,
    avgPace: '8:05 /mi',
    fastestMile: '5:14',
    streakDays: 6,
  };

  return (
    <main style={{ padding: '1.5rem', maxWidth: 1000, margin: '0 auto' }}>
      {/* Profile header */}
      <ProfileHeader {...user} onEdit={() => console.log('edit')} />

      {/* Stats section */}
      <section
        style={{
          border: '1px solid #e0e0e0',
          borderRadius: '0.75rem',
          padding: '1rem 1.25rem',
          marginTop: '1.5rem',
          backgroundColor: '#ffffff',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '0.75rem',
            alignItems: 'baseline',
            flexWrap: 'wrap',
            gap: '0.5rem',
          }}
        >
          <div>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 600, margin: 0 }}>
              Your stats
            </h2>
            <p style={{ fontSize: '0.85rem', color: '#555', margin: '0.25rem 0 0 0' }}>
              Snapshot of your last 30 days of running
            </p>
          </div>
          <span style={{ fontSize: '0.85rem', color: '#666' }}>
            Last 30 days
          </span>
        </div>

        <div style={{ marginTop: '1rem' }}>
          <StatsOverview {...stats} />
        </div>
      </section>
    </main>
  );
}
