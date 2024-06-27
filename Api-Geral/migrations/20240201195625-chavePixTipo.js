'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('produtor', 'chavePix', {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn('produtor', 'tipoChave', {
      type: Sequelize.STRING,
    });
  },
  down: async (queryInterface, Sequelize) => {
  
    await queryInterface.removeColumn('produtor', 'chavePix');
    await queryInterface.removeColumn('produtor', 'tipoChave');
  }
};