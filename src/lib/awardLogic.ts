import { prisma } from '@/lib/prisma';

// eslint-disable-next-line import/prefer-default-export
export async function evaluateAwards(userEmail: string) {
  const runs = await prisma.run.findMany({
    where: { owner: userEmail }, // Or however your team tracks the user
  });

  const unlockedAwards: string[] = [];

  // --- EXAMPLE AWARD CHECKS ---
  if (runs.length >= 3) {
    unlockedAwards.push('3 Runs Completed');
  }

  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const streak = calculateStreak(runs);
  if (streak >= 3) {
    unlockedAwards.push('3-Day Streak');
  }

  const totalMiles = runs.reduce((acc, r) => acc + r.distance, 0);
  if (totalMiles >= 25) {
    unlockedAwards.push('25-Mile Award');
  }

  // Save new awards
  for (const award of unlockedAwards) {
    // eslint-disable-next-line no-await-in-loop
    await prisma.userAward.upsert({
      where: { userEmail_awardName: { userEmail, awardName: award } },
      update: {},
      create: { userEmail, awardName: award },
    });
  }

  return unlockedAwards;
}

// eslint-disable-next-line max-len, @typescript-eslint/no-unused-vars
function calculateStreak(_runs: { id: number; location: string; distance: number; pace: string; difficulty: string; }[]) {
  // Simple version: you sort by date and count consecutive days
  return 3; // placeholder
}
