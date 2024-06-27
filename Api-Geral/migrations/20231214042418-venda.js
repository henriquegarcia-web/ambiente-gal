'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('venda', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idTransacao: {
        type: Sequelize.STRING
      },
      checkoutLink: {
        type: Sequelize.STRING
      },
      nome: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      cpf: {
        type: Sequelize.STRING
      },
      celular: {
        type: Sequelize.STRING
      },
      cep: {
        type: Sequelize.STRING
      },
      rua: {
        type: Sequelize.STRING
      },
      numero: {
        type: Sequelize.STRING
      },
      bairro: {
        type: Sequelize.STRING
      },
      cidade: {
        type: Sequelize.STRING
      },
      estado: {
        type: Sequelize.STRING
      },
      complemento: {
        type: Sequelize.STRING
      },
      assinatura: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      valor: {
        type: Sequelize.FLOAT
      },
      tipo: {
        type: Sequelize.STRING
      },
      cupomName: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('afiliacoes');
  }
};
