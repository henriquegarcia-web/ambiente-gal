'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('checkout', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idCupom: {
        type: Sequelize.INTEGER
      },
      idPixel: {
        type: Sequelize.STRING
      },
      idProduto: {
        type: Sequelize.STRING,
      },
      nome:{
        type: Sequelize.TEXT,
      },
      descricao:{
        type: Sequelize.STRING,
      },
      time:{
        type: Sequelize.TIME,
      },
      link:{
        type: Sequelize.TEXT,
      },
      imagem:{
        type: Sequelize.STRING,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),

      }
    });

},
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('checkout');
  }
};
