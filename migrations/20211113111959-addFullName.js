'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('TourmeAdminUsers', 'fullname', {
      type: Sequelize.DataTypes.STRING,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('TourmeAdminUsers', 'fullname', {
      type: Sequelize.DataTypes.STRING,
    });
  },
};
