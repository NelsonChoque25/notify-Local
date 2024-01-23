const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/database");

class Event extends Model {}

Event.init(
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
    eventType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    eventTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    dvrName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dvrSerialNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cameraName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("new","pending", "completed"),
      allowNull: true,
    },
    observations: {
      type: DataTypes.TEXT,
      allowNull: true,
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
    modelName: "Event",
    tableName: "Events",
    timestamps: true,
  }
);

module.exports = Event;
