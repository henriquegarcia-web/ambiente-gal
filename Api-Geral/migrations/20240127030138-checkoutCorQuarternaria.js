'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('checkout', 'corQuaternaria', {
      type: Sequelize.STRING,
    });

  },
  down: async (queryInterface, Sequelize) => {
  
    await queryInterface.removeColumn('checkout', 'corQuaternaria');
  }
};