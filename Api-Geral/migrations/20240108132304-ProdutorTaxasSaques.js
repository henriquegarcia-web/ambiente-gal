'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('produtor', 'saque', {
      type: Sequelize.FLOAT,
      defaultValue:4.99
    });
    await queryInterface.addColumn('produtor', 'taxaFixa', {
      type: Sequelize.FLOAT,
      defaultValue:1.49
    });
    await queryInterface.addColumn('produtor', 'taxaVariavel', {
      type: Sequelize.FLOAT,
      defaultValue:6.49
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('produtor', 'saque');
    await queryInterface.removeColumn('produtor', 'taxaFixa');
    await queryInterface.removeColumn('produtor', 'taxaVariavel');
  }
};