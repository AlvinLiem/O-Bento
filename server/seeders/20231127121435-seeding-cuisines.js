'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let data = require(`../data/cuisine.json`).map(el => {
      el.createdAt = el.updatedAt = new Date()
      return el
     })
     await queryInterface.bulkInsert("Cuisines", data)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Cuisines")
  }
};
