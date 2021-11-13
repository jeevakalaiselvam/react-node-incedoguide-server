const db = require('../config/database');
const TourmeAdminUser = require('../models/TourmeAdminUser');

//Get all Admin Users for Tourme
exports.getAdminDetails = async (req, res) => {
  await TourmeAdminUser.findAll()
    .then((tourmeAdminUsers) => {
      console.log(tourmeAdminUsers);
      res.status(200).json({
        status: 'success',
        tourmeAdminUsers,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        status: 'fail',
        error,
      });
    });
};

//Add a Admin User to Tourme
exports.addNewAdminDetails = async (req, res) => {
  const { userId, fullName, emailId } = req.body;
  console.log({ userId, fullName, emailId });

  //Insert Admin user in Table
  TourmeAdminUser.create({
    userId,
    fullName,
    emailId,
  })
    .then((tourmeAdminUser) => {
      res.status(201).json({
        status: 'success',
        tourmeAdminUser,
      });
    })
    .catch((error) => {
      res.status(500).json({
        status: 'fail',
        error,
      });
    });
};
