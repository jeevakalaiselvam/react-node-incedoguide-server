const { DataTypes } = require('sequelize');
const database = require('../config/database');
const { TOURME_USERS } = require('../constants/tableConstants');

const TourmeUser = database.define('TourmeUser', {
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
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

module.exports = TourmeUser;
