'use strict';

const faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {

    let data = [];
    let nombre = 20;

    const roles = ['admin', 'author', 'guest']

    let date = faker.date.past();
    while (nombre--) {
      data.push({
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        role: faker.helpers.randomize(roles),
        createdAt: date,
        updatedAt: date
      })
    }
    console.log(data)
    await queryInterface.bulkInsert('Users', data, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
