const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/database");

class TestsSamsung extends Model {}

TestsSamsung.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    macAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    eventName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    datetime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "TestSamsung",
    tableName: "TestsSamsung",
  }
);

module.exports = TestsSamsung;
