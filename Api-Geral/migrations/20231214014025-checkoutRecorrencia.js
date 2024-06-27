'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('checkout', 'recorrencia', {
      type: Sequelize.FLOAT,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('checkout', 'recorrencia');
  }
};