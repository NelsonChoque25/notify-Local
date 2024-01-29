const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/database");

class BcpNotification extends Model {}

BcpNotification.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    operationType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    operationDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    operationNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    orderingCompany: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    account: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    accountType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    beneficiary: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    destinationAccount: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    reference: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "BcpNotification",
    tableName: "BcpNotification",
    timestamps: false,
  }
);

module.exports = BcpNotification;
