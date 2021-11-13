const db = require('../config/database');
const TourmeProject = require('../models/TourmeProject');

//Onboard the Project
exports.onboardProject = async (req, res) => {
  const { userId, projectName, roleType } = req.body;
  console.log({ userId, projectName, roleType });

  try {
    const project = await TourmeProject.create({
      userId,
      projectName,
      roleType,
    });

    if (project) {
      res.status(201).json({
        status: 'success',
        project,
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
      error,
    });
  }
};
