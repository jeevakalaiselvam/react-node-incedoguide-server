const db = require('../config/database');
const TourmeProject = require('../models/TourmeProject');
const TourmeUser = require('../models/TourmeUser');

//Get Project Information
exports.getProjectInfo = async (req, res) => {
  const { userId, projectName } = req.body;
  const project = await TourmeProject.findOne({
    where: { userId, projectName: projectName },
  });

  console.log(project);

  try {
    if (project == null) {
      res.status(200).json({
        status: 'fail',
      });
    } else {
      res.status(200).json({
        status: 'success',
        project,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'error',
    });
  }
};
