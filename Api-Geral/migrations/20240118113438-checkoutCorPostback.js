'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('checkout', 'postback', {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn('checkout', 'corPrimaria', {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn('checkout', 'corSecundaria', {
      type: Sequelize.STRING,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('checkout', 'postback');
    await queryInterface.removeColumn('checkout', 'corPrimaria');
    await queryInterface.removeColumn('checkout', 'corSecundaria');
  }
};