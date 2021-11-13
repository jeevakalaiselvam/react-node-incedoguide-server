const { DataTypes } = require('sequelize');
const database = require('../config/database');
const TourmeProject = require('./TourmeProject');
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

// TourmeUser.hasMany(TourmeProject, { as: 'projects' });

// TourmeProject.belongsTo(TourmeUser, {
//   foreignKey: 'userId',
//   as: 'TourmeUser',
// });

module.exports = TourmeUser;
