'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('requerente', 'pixVariavel', {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn('requerente', 'boletoFixa', {
      type: Sequelize.STRING,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('requerente', 'pixVariavel');
    await queryInterface.removeColumn('requerente', 'boletoFixa');
  }
};