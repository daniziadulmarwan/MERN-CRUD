"use strict";
const { faker } = require("@faker-js/faker");

module.exports = {
  async up(queryInterface, Sequelize) {
    for (let i = 0; i < 200; i++) {
      await queryInterface.bulkInsert(
        "Teachers",
        [
          {
            name: faker.name.findName(),
            email: faker.internet.email(),
            phone: faker.phone.number(),
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        {}
      );
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Teachers", null, {});
  },
};
