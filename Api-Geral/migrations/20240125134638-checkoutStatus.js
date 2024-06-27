'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('checkout', 'statusEndereco', {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn('checkout', 'statusCupom', {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn('checkout', 'statusTimer', {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn('checkout', 'statusEmail', {
      type: Sequelize.STRING,
    });

  },
  down: async (queryInterface, Sequelize) => {
  
    await queryInterface.removeColumn('checkout', 'statusEndereco');
    await queryInterface.removeColumn('checkout', 'statusCupom');
    await queryInterface.removeColumn('checkout', 'statusTimer');
    await queryInterface.removeColumn('checkout', 'statusEmail');
  }
};