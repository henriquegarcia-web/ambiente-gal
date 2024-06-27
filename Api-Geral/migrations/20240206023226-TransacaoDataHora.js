'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // await queryInterface.addColumn('transacao', 'data', {
    //   type: Sequelize.DATE,
    // });
    // await queryInterface.addColumn('transacao', 'hora', {
    //   type: Sequelize.TIME,
    // });
  },
  
  down: async (queryInterface, Sequelize) => {
  
    await queryInterface.removeColumn('transacao', 'data');
    await queryInterface.removeColumn('transacao', 'hora');
  }
};