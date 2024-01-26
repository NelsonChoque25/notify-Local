const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/database");

class InterbankCompany extends Model {}

InterbankCompany.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    orderingCompany: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    beneficiary: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    accountCharge: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    accountDestination: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    numberApplication: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dateTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "InterbankCompany",
    tableName: "InterbankCompanys",
    timestamps: false,
  }
);

module.exports = InterbankCompany;