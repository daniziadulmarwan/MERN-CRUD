"use strict";
const { faker } = require("@faker-js/faker");

module.exports = {
  async up(queryInterface, Sequelize) {
    for (let i = 0; i < 300; i++) {
      await queryInterface.bulkInsert(
        "Employes",
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
    await queryInterface.bulkDelete("Employes", null, {});
  },
};
