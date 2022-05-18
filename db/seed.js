import db from './db.js';
import User from './models/User.js';

async function seed() {
  await db.sync({ force: true });
  console.log('db synced!');
  const jae = await User.create({
    username: 'jae',
    isAdmin: true,
    email: 'jae@gmail.com',
    birthDay: '01-16-1996',
    password: '123456'
  });
  const dae = await User.create({
    username: 'dae',
    isAdmin: true,
    email: 'dae@gmail.com',
    birthDay: '01-16-1996',
    password: '123456'
  });
  const hyunSoo = await User.create({
    username: 'hyunSoo',
    isAdmin: true,
    email: 'hyunSoo@gmail.com',
    birthDay: '01-16-1996',
    password: '123456'
  });
  console.log('seeded users');
};

async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed')
  }
}


runSeed();
