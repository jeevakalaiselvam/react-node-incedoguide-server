const { DataTypes } = require('sequelize');
const database = require('../config/database');
const User = database.define(
  'User',
  {
    userId: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    emailId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: 'USERS',
  }
);

module.exports = User;
