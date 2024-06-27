'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('produtor', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      cpfCnpj: {
        type: Sequelize.STRING,
      },
      cep:{
        type: Sequelize.INTEGER,
      },
      rua:{
        type: Sequelize.STRING,
      },
      numero:{
        type: Sequelize.STRING,
      },
      bairro:{
        type: Sequelize.STRING,
      },
      cidade:{
        type: Sequelize.STRING,
      },
      estado:{
        type: Sequelize.STRING,
      },
      banco:{
        type: Sequelize.STRING,
      },
      agencia:{
        type: Sequelize.STRING,
      },
      agenciaDig:{
        type: Sequelize.STRING,
      },
      conta:{
        type: Sequelize.STRING,
      },
      contaDig:{
        type: Sequelize.INTEGER,
      },
      valor:{
        type: Sequelize.FLOAT,
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
    await queryInterface.dropTable('produtor');
  }
};
