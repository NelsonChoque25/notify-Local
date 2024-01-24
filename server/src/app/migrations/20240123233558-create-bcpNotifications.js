'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('BcpNotifications', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        operationType: {
          allowNull: false,
          type: Sequelize.STRING
        },
        operationDate: {
          allowNull: false,
          type: Sequelize.DATE
        },
        operationNumber: {
          allowNull: false,
          type: Sequelize.STRING
        },
        orderingCompany: {
          allowNull: false,
          type: Sequelize.STRING
        },
        account: {
          allowNull: false,
          type: Sequelize.STRING
        },
        accountType: {
          allowNull: false,
          type: Sequelize.STRING
        },
        beneficiary: {
          allowNull: false,
          type: Sequelize.STRING
        },
        destinationAccount: {
          allowNull: false,
          type: Sequelize.STRING
        },
        amount: {
          allowNull: false,
          type: Sequelize.STRING
        },
        reference: {
          allowNull: true,
          type: Sequelize.STRING
        },
        message: {
          allowNull: true,
          type: Sequelize.STRING
        },
      });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('BcpNotifications');
  }
};
