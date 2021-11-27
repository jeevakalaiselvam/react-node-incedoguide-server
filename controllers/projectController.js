const db = require('../config/database');
const Project = require('../models/Project');
const User = require('../models/User');

//Get Project Information
exports.getProjectInfo = async (req, res) => {
  const { userId, projectName } = req.body;
  const project = await Project.findOne({
    where: { userId, projectName: projectName },
  });

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
