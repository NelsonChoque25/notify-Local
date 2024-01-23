const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/database");

class BcpAlert extends Model {}

BcpAlert.init(
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
    account: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dateTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "BcpAlert",
    tableName: "BcpAlerts",
    timestamps: true,
  }
);

module.exports = BcpAlert;