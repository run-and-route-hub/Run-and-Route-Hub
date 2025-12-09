'use server';

import { hash } from 'bcryptjs';
import { redirect } from 'next/navigation';
import { prisma } from './prisma';

/**
 * Creates a new user in the database.
 * @param credentials, an object with the following properties: email, password.
 */
export async function createUser(credentials: { email: string; password: string }) {
  // console.log(`createUser data: ${JSON.stringify(credentials, null, 2)}`);
  const password = await hash(credentials.password, 10);
  await prisma.user.create({
    data: {
      email: credentials.email,
      password,
    },
  });
}
/**
 * Adds a new route to the database.
 * @param route,
 */
export async function addRoute(route: {
  name: string,
  distanceKm: number,
  distanceMile: number,
  path: { lat: number, lng: number }[]
}) {
  console.log(route);
  await prisma.route.create({
    data: {
      name: route.name,
      colorr: Math.floor(Math.random() * 256),
      colorg: Math.floor(Math.random() * 256),
      colorb: Math.floor(Math.random() * 256),
      distanceKm: route.distanceKm,
      distanceMile: route.distanceMile,
      path: {
        create: route.path.map((p) => ({ lat: p.lat, lng: p.lng })),
      },
    },
  });
  // After adding, redirect to the list page
  redirect('/routes');
}
/**
 * Changes the password of an existing user in the database. n
 * @param credentials, an object with the following properties: email, password.
 */
export async function changePassword(credentials: { email: string; password: string }) {
  // console.log(`changePassword data: ${JSON.stringify(credentials, null, 2)}`);
  const password = await hash(credentials.password, 10);
  await prisma.user.update({
    where: { email: credentials.email },
    data: {
      password,
    },
  });
}
