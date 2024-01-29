const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/database");

class CncBbva extends Model {}

CncBbva.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    client: {
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
    modelName: "CncBbva",
    tableName: "CncBbva",
    timestamps: false,
  }
);

module.exports = CncBbva;