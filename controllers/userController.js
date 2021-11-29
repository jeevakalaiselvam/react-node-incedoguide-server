const db = require('../config/database');
const { INCEDOGUIDE_ROLES } = require('../constants/incedoguideConstants');
const Project = require('../models/Project');
const User = require('../models/User');

//Get all Admin Users for Incedo Guide
exports.getAllUserDetails = async (req, res) => {
  try {
    const users = await User.findAll();
    if (users) {
      res.status(200).json({
        status: 'success',
        users,
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
    const { userId, emailId, fullName, projectName, projectRoles } = req.body;
    console.log('PROJECT ROLES', projectRoles);
    const user = await User.findOne({ where: { userId: userId } });

    if (user !== null) {
      const project = await Project.findOne({
        where: { userId: userId, projectName: projectName },
      });

      if (project !== null) {
        res.status(200).json({
          status: 'success',
          user,
          project,
        });
      }
    } else {
      const newUser = await User.create({ userId, emailId, fullName });
      if (newUser !== null) {
        //For user provided roles, Create mapping with default number of users in that role
        let newProjectRoles = {};
        //Add configuring user as default admin and add other roles provided in config
        newProjectRoles = { ...newProjectRoles, MAIN_ADMIN: [userId] };
        projectRoles.forEach((role) => {
          newProjectRoles = { ...newProjectRoles, [role]: [] };
        });

        const newProject = await Project.create({
          userId,
          projectName,
          roleType: INCEDOGUIDE_ROLES.INCEDOGUIDE_ADMIN,
          projectRoles: newProjectRoles,
        });

        if (newProject !== null) {
          const project = await Project.findOne({
            where: { userId: userId, projectName: projectName },
          });
          if (project) {
            res.status(200).json({
              status: 'success',
              user: newUser,
              project,
            });
          }
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};
