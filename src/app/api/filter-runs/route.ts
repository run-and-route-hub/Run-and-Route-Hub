import { NextResponse } from 'next/server';

const runs = [
  {
    id: 1,
    location: 'Kapiolani Park',
    distance: 3,
    pace: 'moderate',
    difficulty: 'easy',
  },
  {
    id: 2,
    location: 'Diamond Head Trail',
    distance: 5,
    pace: 'fast',
    difficulty: 'hard',
  },
  {
    id: 3,
    location: 'Ala Moana Beach Park',
    distance: 4,
    pace: 'slow',
    difficulty: 'moderate',
  },
  {
    id: 4,
    location: 'Manoa Valley Loop',
    distance: 3.20,
    pace: 'moderate',
    difficulty: 'moderate',
  },
  {
    id: 5,
    location: 'Diamond Head Trail (Short)',
    distance: 1.60,
    pace: 'fast',
    difficulty: 'hard',
  },
  {
    id: 6,
    location: 'Tantalus Drive',
    distance: 5.40,
    pace: 'slow',
    difficulty: 'hard',
  },
  {
    id: 7,
    location: 'Ala Moana Beach Path',
    distance: 2.10,
    pace: 'slow',
    difficulty: 'easy',
  },
  {
    id: 8,
    location: 'Kapiolani Park Loop',
    distance: 2.80,
    pace: 'moderate',
    difficulty: 'easy',
  },
];

// eslint-disable-next-line import/prefer-default-export
export async function POST(req: Request) { //
  try {
    const { difficulty, minDistance, pace } = await req.json();

    const filtered = runs.filter((run) => {
      const matchesDifficulty = difficulty
        ? run.difficulty.toLowerCase() === difficulty.toLowerCase()
        : true;

      const matchesDistance = minDistance
        ? run.distance >= parseFloat(minDistance)
        : true;

      const matchesPace = pace
        ? run.pace.toLowerCase() === pace.toLowerCase()
        : true;

      return matchesDifficulty && matchesDistance && matchesPace;
    });

    return NextResponse.json({ runs: filtered });
  } catch (error) {
    console.error('API error:', error);
    return new NextResponse('Failed to filter runs', { status: 500 });
  }
}
