const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/database");

class Test extends Model {}

Test.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Test",
    tableName: "Tests",
    timestamps: false,
  }
);

module.exports = Test;
