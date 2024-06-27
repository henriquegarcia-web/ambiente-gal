'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('produtor', 'titular', {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn('produtor', 'tipoConta', {
      type: Sequelize.STRING,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('produtor', 'titular');
    await queryInterface.removeColumn('produtor', 'tipoConta');

  }
};