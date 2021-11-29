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

//Update Project
exports.updateProjectRoles = async (req, res) => {
  console.log('UPDATING PROJECT ROLES');
  try {
    const { userId, projectId, projectRoles } = req.body;
    const updatedProject = await Project.update(
      { projectRoles },
      { where: { projectId, userId } }
    );
    if (updatedProject !== null) {
      const rolesUpdatedProject = await Project.findOne({
        where: { projectId, userId },
      });
      res.status(200).json({
        rolesUpdatedProject,
      });
    } else {
      console.log(error);
      res.status(500).json({
        status: 'error',
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'error',
    });
  }
};
