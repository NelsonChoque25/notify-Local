'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('BcpAlert', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      orderingCompany:{
        allowNull: false,
        type: Sequelize.STRING
      },
      beneficiary:{
        allowNull: false,
        type: Sequelize.STRING
      },
      account:{
        allowNull: false,
        type: Sequelize.STRING
      },
      amount:{
        allowNull: false,
        type: Sequelize.FLOAT
      },
      message:{
        allowNull: true,
        type: Sequelize.STRING
      },
      dateTime:{
        allowNull: false,
        type: Sequelize.DATE
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('BcpAlert');
  }
};
