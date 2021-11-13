const { DataTypes } = require('sequelize');
const database = require('../config/database');

const TourmeProject = database.define('TourmeProject', {
  projectId: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  projectName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.STRING,
    references: 'TourmeUser',
    referencesKey: 'userId',
  },
  roleType: {
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
});

module.exports = TourmeProject;
