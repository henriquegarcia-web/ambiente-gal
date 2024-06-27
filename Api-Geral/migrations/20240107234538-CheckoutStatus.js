'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('checkout', 'status', {
      type: Sequelize.BOOLEAN,
      defaultValue:false
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('checkout', 'status');
  }
};