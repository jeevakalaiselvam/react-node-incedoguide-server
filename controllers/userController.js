const db = require('../config/database');
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

//Get all Admin Users for Tourme
exports.getUserDetails = async (req, res) => {
  try {
    const { userId } = req.body;
    console.log('JEEVA', userId);
    const tourmeUser = await TourmeUser.findOne({ where: { userId: userId } });
    const projectsForUser = await TourmeProject.findAll({
      where: { userId: userId },
    });
    Promise.all([tourmeUser, projectsForUser])
      .then((response) => {
        if (response[0]) {
          //User is present
          if (response[1]) {
            //User has Projects
            res.status(200).json({
              status: 'success',
              tourmeUser: response[0],
              projectsForUser: response[1],
            });
          } else {
            res.status(200).json({
              status: 'success',
              tourmeUser: response[0],
              projectsForUser: {},
            });
          }
        } else {
          console.log('USER NOT PRESENT');
          res.status(200).json({
            tourmeUser: {},
            projectsForUser: {},
            status: 'success',
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
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'error',
    });
  }
};

//Add a Admin User to Tourme
exports.addNewUserDetails = async (req, res) => {
  const { userId, fullName, emailId } = req.body;

  try {
    const user = await TourmeUser.create({
      userId,
      fullName,
      emailId,
    });

    if (user) {
      res.status(201).json({
        status: 'success',
        user,
      });
    } else {
      res.status(201).json({
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

//Onboard User and Project
exports.onboardProject = async (req, res) => {
  try {
    const { userId, emailId, fullName, projectName, roleType } = req.body;
    console.log({ userId, emailId, fullName, projectName, roleType });
    console.log('Onboarding', req.body);

    const user = await TourmeUser.create({
      userId,
      emailId,
      fullName,
    });

    console.log(user);

    if (user !== null) {
      const project = await TourmeProject.create({
        userId,
        projectName,
        roleType,
      });

      if (project !== null) {
        console.log('Both Onboarded..');
        res.status(201).json({
          status: 'success',
          project,
          user,
        });
      } else {
        res.status(200).json({
          status: 'fail',
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};
