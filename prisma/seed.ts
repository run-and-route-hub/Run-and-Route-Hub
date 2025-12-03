import { PrismaClient, Role, Condition } from '@prisma/client';
import { hash } from 'bcryptjs';
import * as config from '../config/settings.development.json';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding the database');
  const password = await hash('changeme', 10);
  config.defaultAccounts.forEach(async (account) => {
    const role = account.role as Role || Role.USER;
    console.log(`  Creating user: ${account.email} with role: ${role}`);
    await prisma.user.upsert({
      where: { email: account.email },
      update: {},
      create: {
        email: account.email,
        password,
        role,
      },
    });
    // console.log(`  Created user: ${user.email} with role: ${user.role}`);
  });
  for (const data of config.defaultData) {
    const condition = data.condition as Condition || Condition.good;
    console.log(`  Adding stuff: ${JSON.stringify(data)}`);
    // eslint-disable-next-line no-await-in-loop
    await prisma.stuff.upsert({
      where: { id: config.defaultData.indexOf(data) + 1 },
      update: {},
      create: {
        name: data.name,
        quantity: data.quantity,
        owner: data.owner,
        condition,
      },
    });
  }

  console.log('Seeding run data...');
  await prisma.run.createMany({
    data: [
    // --- Original 3 ---
      { location: 'Kapiolani Park', distance: 3, pace: 'moderate', difficulty: 'easy' },
      { location: 'Diamond Head Trail', distance: 5, pace: 'fast', difficulty: 'hard' },
      { location: 'Ala Moana Beach Park', distance: 4, pace: 'slow', difficulty: 'moderate' },

      // --- Your newly added ones ---
      { location: 'Manoa Valley Loop', distance: 3, pace: 'moderate', difficulty: 'moderate' },
      { location: 'Diamond Head (Short Trail)', distance: 2, pace: 'fast', difficulty: 'hard' },
      { location: 'Tantalus Drive', distance: 5, pace: 'slow', difficulty: 'hard' },
      { location: 'Ala Moana Beach Path', distance: 2, pace: 'slow', difficulty: 'easy' },
      { location: 'Kapiolani Park Loop', distance: 3, pace: 'moderate', difficulty: 'easy' },

      // --- Additional realistic Honolulu running routes ---
      { location: 'Magic Island Loop', distance: 2, pace: 'slow', difficulty: 'easy' },
      { location: 'Kakaako Waterfront Path', distance: 3, pace: 'moderate', difficulty: 'easy' },
      { location: 'Waikiki Strip Run', distance: 2, pace: 'slow', difficulty: 'easy' },
      { location: 'UH Manoa Campus Loop', distance: 2, pace: 'moderate', difficulty: 'moderate' },
      { location: 'Makiki Valley Trail', distance: 4, pace: 'slow', difficulty: 'hard' },
      { location: 'Puu Ualakaa Park Path', distance: 2, pace: 'slow', difficulty: 'moderate' },
      { location: 'Manoa Falls Trail', distance: 3, pace: 'slow', difficulty: 'hard' },
      { location: 'Kuliouou Ridge Trail', distance: 5, pace: 'slow', difficulty: 'hard' },
      { location: 'Hawaii Kai Marina Loop', distance: 4, pace: 'moderate', difficulty: 'easy' },
      { location: 'Waialae Beach Run', distance: 2, pace: 'slow', difficulty: 'easy' },
      { location: 'Makapuu Lighthouse Trail', distance: 2, pace: 'moderate', difficulty: 'moderate' },
      { location: 'Sandy Beach Path', distance: 3, pace: 'slow', difficulty: 'easy' },
      { location: 'Kaneohe Bay Waterfront Path', distance: 5, pace: 'moderate', difficulty: 'easy' },
      { location: 'Hauula Loop Trail', distance: 4, pace: 'slow', difficulty: 'moderate' },
      { location: 'Lanikai Pillbox Trail', distance: 1, pace: 'slow', difficulty: 'hard' },
      { location: 'Pearl Harbor Bike Path', distance: 10, pace: 'moderate', difficulty: 'moderate' },
      { location: 'Aiea Loop Trail', distance: 4, pace: 'slow', difficulty: 'hard' },
      { location: 'Koko Head Railway Steps', distance: 1, pace: 'slow', difficulty: 'hard' },
      { location: 'Ala Wai Canal Path', distance: 4, pace: 'slow', difficulty: 'easy' },
      { location: 'Chaminade Campus Loop', distance: 1, pace: 'slow', difficulty: 'easy' },
      { location: 'Moanalua Valley Trail', distance: 6, pace: 'slow', difficulty: 'hard' },
      { location: 'Kaena Point Trail', distance: 5, pace: 'slow', difficulty: 'moderate' },
      { location: 'Honolulu Harbor Front', distance: 3, pace: 'moderate', difficulty: 'easy' },
      { location: 'Kaimuki Neighborhood Loop', distance: 2, pace: 'moderate', difficulty: 'easy' },
    ],
  });
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
