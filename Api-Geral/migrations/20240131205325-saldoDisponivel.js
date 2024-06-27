'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('transacao', 'saldoDisponivel', {
      type: Sequelize.FLOAT,
    });

  },
  down: async (queryInterface, Sequelize) => {
  
    await queryInterface.removeColumn('transacao', 'saldoDisponivel');
  }
};