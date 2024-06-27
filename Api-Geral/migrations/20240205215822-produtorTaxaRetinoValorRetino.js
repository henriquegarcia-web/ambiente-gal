'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('produtor', 'valorRetido', {
      type: Sequelize.FLOAT,
    });
    await queryInterface.addColumn('produtor', 'taxaRetido', {
      type: Sequelize.FLOAT,
      defaultValue:5.0
    });
  },
  down: async (queryInterface, Sequelize) => {
  
    await queryInterface.removeColumn('produtor', 'valorRetido');
    await queryInterface.removeColumn('produtor', 'taxaRetido');
  }
};