'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('produtor', 'saldoDisponivel', {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn('produtor', 'saldoPendente', {
      type: Sequelize.STRING,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('produtor', 'saldoDisponivel');
    await queryInterface.removeColumn('produtor', 'saldoPendente');
  }
};