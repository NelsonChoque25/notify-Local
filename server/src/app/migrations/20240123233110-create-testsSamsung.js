'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('TestsSamsung', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name:{
        allowNull: false,
        type: Sequelize.STRING
      },
      macAddress:{
        allowNull: false,
        type: Sequelize.STRING
      },
      eventName:{
        allowNull: false,
        type: Sequelize.STRING
      },
      message:{
        allowNull: false,
        type: Sequelize.DATE
      },
      datetime:{
        allowNull: false,
        type: Sequelize.DATE
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('TestsSamsung');
  }
};
