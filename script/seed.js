'use strict';
const faker = require('faker');

const {
  db,
  models: { User, Candy },
} = require('../server/db');

//Generate Random Price
function genRandomPrice(min, max) {
  const num = Math.random() * (max - min + 1) + min;
  return num.toFixed(2);
}
//Candies data
const candiesData = require('../server/db/seedData');

//Generate candy objs to use for seeding candy table
const candyObjs = candiesData.map(function (candy) {
  const price = genRandomPrice(1, 10);
  return {
    name: candy,
    price,
    imageUrl:
      'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2FuZGllc3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
  };
});

//Generate random users using Faker.js
//passwords are just the username+pw
const genRandomUsers = function (num) {
  const result = [];
  for (let i = 0; i < num; i++) {
    const nameOne = faker.name.firstName();
    const nameTwo = faker.name.lastName();
    result.push({
      username: `${nameOne}${nameTwo}`,
      password: `${nameOne}${nameTwo}pw`,
    });
  }
  return result;
};

const randomUser = genRandomUsers(100);
/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');

  // Creating Users
  const users = await Promise.all([
    User.create({ username: 'cody', password: '123' }),
    User.create({ username: 'murphy', password: '123' }),
  ]);

  const randomUsers = await Promise.all(
    randomUser.map(function (user) {
      User.create(user);
    })
  );

  //Database seeding
  const candies = await Promise.all(
    candyObjs.map((candy) => {
      return Candy.create(candy);
    })
  );

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
