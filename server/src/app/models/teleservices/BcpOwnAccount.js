const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/database");

class BcpOwnAccount extends Model {}

BcpOwnAccount.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    sendsTo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    accountSendsTo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    from: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    accountFrom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    channel: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    numberOperation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    dateTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "BcpOwnAccount",
    tableName: "BcpOwnAccount",
    timestamps: false,
  }
);

module.exports = BcpOwnAccount;