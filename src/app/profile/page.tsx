'use client';

import ProfileHeader from './ProfileHeader';
import StatsOverview from './StatsOverview';

export default function ProfilePage() {
  const user = {
    name: 'John Foo',
    username: 'john_foo',
    bio: 'UH Mānoa student | Athletic freak | 67 glizzy destroyer',
    avatarUrl: '/profile/john.jpg',
    bannerUrl: '/banner/banner.jpeg',
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
    <main className="mx-auto w-full max-w-5xl space-y-8 px-4 py-8 sm:px-6">
      <ProfileHeader {...user} onEdit={() => console.log('edit')} />

      <section className="space-y-3">
        <div className="flex items-end justify-between">
          <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
            Your Stats
          </h2>
          <p className="text-xs text-gray-500 sm:text-sm">
            Last 30 days
          </p>
        </div>
        <StatsOverview {...stats} />
      </section>
    </main>
  );
}
