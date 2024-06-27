'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('produtor', 'versoIdentidade', {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn('produtor', 'frenteIdentidade', {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn('produtor', 'cartaoCNPJ', {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn('produtor', 'selfieDocumento', {
      type: Sequelize.STRING,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('produtor', 'versoIdentidade', {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn('produtor', 'frenteIdentidade', {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn('produtor', 'cartaoCNPJ', {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn('produtor', 'selfieDocumento', {
      type: Sequelize.STRING,
    });
  }
};