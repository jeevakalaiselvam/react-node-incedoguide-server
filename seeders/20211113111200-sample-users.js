'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'TourmeAdminUsers',
      [
        {
          userid: 'KALAJE9',
          email: 'jeeva.kalaiselvam@verizon.com',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userid: 'RSA6FPJ',
          email: 'sathish.kumar@verizon.com',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userid: 'PRI1234',
          email: 'priyanka.padmanaban@verizon.com',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('TourmeAdminUsers', null, {});
  },
};
