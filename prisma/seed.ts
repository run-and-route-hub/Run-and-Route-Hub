import { PrismaClient, Role, Condition } from '@prisma/client';
import { hash } from 'bcryptjs';
import * as config from '../config/settings.development.json';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding the database');
  const password = await hash('changeme', 10);
  config.defaultAccounts.forEach(async (account) => {
    const role = (account.role as Role) || Role.USER;
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
    // s
    // console.log(`  Created user: ${user.email} with role: ${user.role}`);
  });
  for (const data of config.defaultData) {
    const condition = (data.condition as Condition) || Condition.good;
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
  // new run data seed — added safely here
  console.log('Seeding run data...');
  await prisma.run.createMany({
    data: [
      {
        location: 'Kapiolani Park',
        distance: 3,
        pace: 'moderate',
        difficulty: 'easy',
      },
      {
        location: 'Diamond Head Trail',
        distance: 5,
        pace: 'fast',
        difficulty: 'hard',
      },
      {
        location: 'Ala Moana Beach Park',
        distance: 4,
        pace: 'slow',
        difficulty: 'moderate',
      },
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
