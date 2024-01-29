'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('BcpOwnAccount', {
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
      accountSendsTo:{
        allowNull: false,
        type: Sequelize.STRING
      },
      from:{
        allowNull: false,
        type: Sequelize.STRING
      },
      accountFrom:{
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
        type: Sequelize.FLOAT
      },
      dateTime:{
        allowNull: false,
        type: Sequelize.DATE
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('BcpOwnAccount');
  }
};
