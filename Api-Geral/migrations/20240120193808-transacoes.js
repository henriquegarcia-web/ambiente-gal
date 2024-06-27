'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('transacao', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idProdutor: {
        type: Sequelize.STRING
      },
      valor: {
        type: Sequelize.STRING
      },
      data: {
        type: Sequelize.DATE
      },
      hora: {
        type: Sequelize.TIME
      },
      status: {
        type: Sequelize.BOOLEAN
      },
      validador:{
        type: Sequelize.STRING
      }


    });

},
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('plataforma');
  }
};
