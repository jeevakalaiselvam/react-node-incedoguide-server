const { Sequelize, DataTypes } = require('sequelize');
const database = require('../config/database');

const TourmeAdminUser = database.define(
  'TourmeAdminUser',
  {
    userId: {
      type: DataTypes.STRING,
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
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: 'TOURME_ADMIN_USERS',
  }
);

module.exports = TourmeAdminUser;
