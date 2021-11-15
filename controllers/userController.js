const db = require('../config/database');
const { TOURME_ROLES } = require('../constants/tourmeConstants');
const TourmeProject = require('../models/TourmeProject');
const TourmeUser = require('../models/TourmeUser');

//Get all Admin Users for Tourme
exports.getAllUserDetails = async (req, res) => {
  try {
    const tourmeUsers = await TourmeUser.findAll();
    if (tourmeUsers) {
      res.status(200).json({
        status: 'success',
        tourmeUsers,
      });
    } else {
      res.status(200).json({
        status: 'fail',
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'error',
    });
  }
};

//Get all User Details, If not present, Onboard User and Project
exports.getUserDetails = async (req, res) => {
  try {
    const { userId, emailId, fullName, projectName } = req.body;
    const tourmeUser = await TourmeUser.findOne({ where: { userId: userId } });

    if (tourmeUser !== null) {
      const projectsForUser = await TourmeProject.findAll({
        where: { userId: userId },
      });

      if (projectsForUser !== null) {
        res.status(200).json({
          status: 'success',
          tourmeUser,
          projectsForUser,
        });
      }
    } else {
      const newUser = TourmeUser.create({ userId, emailId, fullName });
      if (newUser !== null) {
        const newProject = TourmeProject.create({
          userId,
          projectName,
          roleType: TOURME_ROLES.TOURME_ADMIN,
        });

        if (newProject !== null) {
          const projectsForUser = await TourmeProject.findAll({
            where: { userId: userId },
          });
          if (projectsForUser) {
            res.status(200).json({
              status: 'success',
              newUser,
              projectsForUser,
            });
          }
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};
