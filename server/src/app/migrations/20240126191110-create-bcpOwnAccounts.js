'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('BcpOwnAccounts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sendsTo:{
        allowNull: false,
        type: Sequelize.STRING
      },
      from:{
        allowNull: false,
        type: Sequelize.STRING
      },
      channel:{
        allowNull: false,
        type: Sequelize.STRING
      },
      numberOperation:{
        allowNull: false,
        type: Sequelize.STRING
      },
      amount:{
        allowNull: false,
        type: Sequelize.STRING
      },
      dateTime:{
        allowNull: false,
        type: Sequelize.DATE
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('BcpOwnAccounts');
  }
};
