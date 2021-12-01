const { DataTypes } = require('sequelize');
const database = require('../config/database');

const Guide = database.define(
  'Guide',
  {
    guideId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    projectId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: 'Project',
      referencesKey: 'projectId',
    },
    identifier: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    steps: {
      type: DataTypes.JSON,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    roleVisibility: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
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
    tableName: 'GUIDES',
  }
);

module.exports = Guide;
