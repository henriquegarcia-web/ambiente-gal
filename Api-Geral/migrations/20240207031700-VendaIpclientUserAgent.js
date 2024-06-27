'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('venda', 'ip', {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn('venda', 'clientUserAgent', {
      type: Sequelize.STRING,
    });
  },
  down: async (queryInterface, Sequelize) => {
  
    await queryInterface.removeColumn('venda', 'ip');
    await queryInterface.removeColumn('venda', 'clientUserAgent');
  }
};