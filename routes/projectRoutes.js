const express = require('express');
const projectController = require('../controllers/projectController');

const router = express.Router();

router.post('/onboard', projectController.onboardProject);

module.exports = router;
