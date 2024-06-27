'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // await queryInterface.addColumn('transacao', 'validador', {
    //   type: Sequelize.DATE,
    // });
  },
  
  down: async (queryInterface, Sequelize) => {
  
    await queryInterface.removeColumn('transacao', 'validador');
  }
};