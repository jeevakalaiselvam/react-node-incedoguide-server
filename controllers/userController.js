const db = require('../config/database');
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
  const { userId } = req.params;
  const tourmeUser = await TourmeUser.findOne({ where: { userId } });

  try {
    if (tourmeUser == null) {
      res.status(200).json({
        status: 'fail',
      });
    } else {
      res.status(200).json({
        status: 'success',
        tourmeUser,
      });
    }
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
