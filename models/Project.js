const { DataTypes } = require('sequelize');
const database = require('../config/database');
const User = database.define(
  'Project',
  {
    userId: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    projectName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userRole: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'TOURME_PROJECTS',
  }
);

module.exports = User;
