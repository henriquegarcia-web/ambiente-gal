'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('conteudo', 'descricao1', {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn('conteudo', 'materiais1', {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn('conteudo', 'descricao2', {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn('conteudo', 'materiais2', {
      type: Sequelize.STRING,
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
