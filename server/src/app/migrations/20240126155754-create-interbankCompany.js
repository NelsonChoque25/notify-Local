'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('InterbankCompanys', {
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
      accountCharge:{
        allowNull: false,
        type: Sequelize.STRING
      },
      accountDestination:{
        allowNull: false,
        type: Sequelize.STRING
      },
      status:{
        allowNull: false,
        type: Sequelize.STRING
      },
      numberApplication:{
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
    await queryInterface.dropTable('InterbankCompany');
  }
};
