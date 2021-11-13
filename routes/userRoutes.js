const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/', userController.getAllUserDetails);
router.get('/:userId', userController.getUserDetails);
router.post('/', userController.addNewUserDetails);

module.exports = router;
