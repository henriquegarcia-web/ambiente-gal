'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('pixel', 'plataforma', {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn('pixel', 'tipo', {
      type: Sequelize.STRING,
    });
  },
  down: async (queryInterface, Sequelize) => {
  
    await queryInterface.removeColumn('pixel', 'plataforma');
    await queryInterface.removeColumn('pixel', 'tipo');
  }
};