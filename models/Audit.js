const { DataTypes } = require('sequelize');
const database = require('../config/database');

const Audit = database.define(
  'Audit',
  {
    auditId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    projectId: {
      type: DataTypes.BIGINT,
      references: 'Project',
      referencesKey: 'projectId',
    },
    userId: {
      type: DataTypes.STRING,
      references: 'User',
      referencesKey: 'userId',
    },
    guideId: {
      type: DataTypes.BIGINT,
      references: 'Guide',
      referencesKey: 'guideId',
    },
    visitCount: {
      type: DataTypes.BIGINT,
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
    tableName: 'AUDITS',
  }
);

module.exports = Audit;
