const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/all', userController.getAllUserDetails);
router.post('/info', userController.getUserDetails);

module.exports = router;
