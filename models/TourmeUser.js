const { DataTypes } = require('sequelize');
const database = require('../config/database');
const TourmeUser = database.define('TourmeUser', {
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
});

module.exports = TourmeUser;
