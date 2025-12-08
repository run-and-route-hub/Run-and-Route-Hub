/* eslint-disable @next/next/no-img-element */
import { Trophy, LightningCharge, Map, Heart, Award, PinMap, Speedometer, Calendar3 } from 'react-bootstrap-icons';

export default function AwardsPage() {
  const awards = [
    // --- Unlocked Awards ---
    {
      title: '3-Day Streak',
      description: 'You ran three days in a row — great consistency!',
      icon: <LightningCharge size={36} className="text-warning" />,
      unlocked: true,
    },
    {
      title: 'Route Explorer',
      description: 'You’ve tried 5+ different running locations around Oʻahu.',
      icon: <Map size={36} className="text-primary" />,
      unlocked: true,
    },
    {
      title: 'Hill Crusher',
      description: 'You completed a route with 300+ ft of elevation gain.',
      icon: <Award size={36} className="text-danger" />,
      unlocked: true,
    },

    // ---- Locked Awards ----
    { title: '7-Day Streak', description: 'Run 7 days in a row to unlock.', icon: <Calendar3 size={36} />, unlocked: false },
    { title: 'Distance Milestone: 25 Miles', description: 'Accumulate 25 total miles.', icon: <PinMap size={36} />, unlocked: false },
    { title: 'Distance Milestone: 50 Miles', description: 'Accumulate 50 total miles.', icon: <PinMap size={36} />, unlocked: false },
    { title: 'Pace Master', description: 'Complete a run at sub-8-minute pace.', icon: <Speedometer size={36} />, unlocked: false },
    { title: 'Sunrise Runner', description: 'Log a run between 5–7 AM.', icon: <Trophy size={36} />, unlocked: false },
    { title: 'Night Owl', description: 'Log a run after 9 PM.', icon: <Trophy size={36} />, unlocked: false },
    { title: 'Community Runner', description: 'Run with a partner 3+ times.', icon: <Heart size={36} />, unlocked: false },
    { title: 'Route Creator', description: 'Add your own route to the system.', icon: <Map size={36} />, unlocked: false },
    { title: 'Consistency Award', description: 'Run at least once a week for a month.', icon: <Calendar3 size={36} />, unlocked: false },
    { title: 'Trail Runner', description: 'Complete 3+ trail runs.', icon: <Award size={36} />, unlocked: false },
    { title: 'City Explorer', description: 'Run through 5 different Honolulu neighborhoods.', icon: <Map size={36} />, unlocked: false },
    { title: 'Speed Demon', description: 'Run a mile under 7 minutes.', icon: <LightningCharge size={36} />, unlocked: false },
    { title: 'Hydration Pro', description: 'Track runs 5 days in a row.', icon: <Heart size={36} />, unlocked: false },
    { title: 'Marathon Mindset', description: 'Accumulate 100 total miles.', icon: <Trophy size={36} />, unlocked: false },
    { title: 'Elevation Beast', description: 'Climb over 1,000 ft total.', icon: <Award size={36} />, unlocked: false },
    { title: 'Aloha Spirit Runner', description: 'Give feedback on 3+ routes.', icon: <Heart size={36} />, unlocked: false },
  ];

  return (
    <main className="py-5">
      <div className="container text-center">
        <h1 className="fw-bold mb-4">🏆 Your Awards</h1>

        <div className="row g-4">
          {awards.map((award, index) => (
            <div key={index} className="col-md-4">
              <div
                className={`p-4 rounded-3 shadow-sm h-100 ${!award.unlocked ? 'bg-light text-muted' : 'bg-white'}`}
                style={{ opacity: award.unlocked ? 1 : 0.5 }}
              >
                <div className="mb-3">{award.icon}</div>
                <h4 className="fw-semibold">{award.title}</h4>
                <p className="mb-0">{award.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
