const { DataTypes } = require('sequelize');
const database = require('../config/database');

const Project = database.define(
  'Project',
  {
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
      references: 'User',
      referencesKey: 'userId',
    },
    roleType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    projectRoles: {
      type: DataTypes.JSON,
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
    tableName: 'PROJECTS',
  }
);

module.exports = Project;
