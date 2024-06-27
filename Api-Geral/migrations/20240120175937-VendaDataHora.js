'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('venda', 'data', {
      type: Sequelize.INTEGER,
    });
    await queryInterface.addColumn('venda', 'hora', {
      type: Sequelize.INTEGER,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('venda', 'data');
    await queryInterface.removeColumn('venda', 'hora');
  }
};