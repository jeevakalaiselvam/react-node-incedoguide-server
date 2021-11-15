const db = require('../config/database');
const User = require('../models/User');
const Project = require('../models/Project');

//Get all User Details, If not present, Onboard User and Project
exports.getUserDetails = async (req, res) => {
  try {
    const { userId, emailId, fullName, projectName } = req.body;
    //Find if user is present already
    const userFound = await User.findOne({ where: { userId: userId } });

    //If user is not present, Create the user and send response
    if (userFound === null) {
      const userCreated = await User.create({
        userId,
        emailId,
        fullName,
        projectName,
      });
      if (userCreated !== null) {
        //If creating user is success, Onboard the project for the user
        const projectCreated = Project.create({
          userId,
          projectName,
          userRole: 'TOURME_ADMIN',
        });
        if (projectCreated !== null) {
          res.status(201).json({ user: userCreated, project: projectCreated });
        }
      } else {
        //If creating user failed, Send status 500
        res.status(500).json({ status: 'fail' });
      }
    } else {
      //If user is already present, Get the project for userId and projectName
      const projectFound = Project.findOne({
        where: { userId: userId, projectName: projectName },
      });
      if (projectFound !== null) {
        //After grabbing project for user, Send them as response
        res.status(200).json({
          user: userFound,
          project: projectFound,
        });
      } else {
        //If project is not present for user, Send failure as response
        res.status(500).json({ status: 'fail' });
      }
    }
  } catch (error) {
    console.log(error);
  }
};
