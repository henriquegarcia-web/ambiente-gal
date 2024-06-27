'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('transacao', 'taxa', {
      type: Sequelize.FLOAT,
    });
    await queryInterface.addColumn('transacao', 'valorLiquido', {
      type: Sequelize.FLOAT,
    });
  },
  down: async (queryInterface, Sequelize) => {
  
    await queryInterface.removeColumn('transacao', 'taxa');
    await queryInterface.removeColumn('transacao', 'valorLiquido');
  }
};