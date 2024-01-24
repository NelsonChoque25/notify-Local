const { Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});

class BcpNotification extends Model {}

BcpNotifications.init({
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
  transferToThirdParty: {
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
    type: DataTypes.STRING,
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
}, {
  sequelize,
  modelName: 'BcpNotification',
  tableName: 'BcpNotifications',
});

module.exports = BcpNotifications;