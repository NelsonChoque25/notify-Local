'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('CncBbva', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      amount:{
        allowNull: false,
        type: Sequelize.FLOAT
      },
      orderingCompany:{
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
    await queryInterface.dropTable('CncBbva');
  }
};
