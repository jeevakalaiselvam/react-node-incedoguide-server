const db = require('../config/database');
const TourmeProject = require('../models/TourmeProject');
const TourmeUser = require('../models/TourmeUser');

//Onboard the Project
exports.onboardProject = async (req, res) => {
  const { userId, emailId, fullName, projectName, roleType } = req.body;
  console.log({ userId, emailId, fullName, projectName, roleType });
  console.log('Onboarding');

  const user = await TourmeUser.create({
    userId,
    emailId,
    fullName,
  });

  const project = await TourmeProject.create({
    userId,
    projectName,
    roleType,
  });

  Promise.all([user, project])
    .then((response) => {
      if (response[0] && response[1]) {
        res.status(201).json({
          status: 'success',
          project,
          user,
        });
      } else {
        res.status(500).json({
          status: 'fail',
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        status: 'error',
        error,
      });
    });
};
