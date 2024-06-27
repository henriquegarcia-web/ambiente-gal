'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('cliente', 'idVenda', {
      type: Sequelize.FLOAT,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('cliente', 'idVenda');
  }
};