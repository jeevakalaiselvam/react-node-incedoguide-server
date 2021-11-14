const express = require('express');
const projectController = require('../controllers/projectController');

const router = express.Router();

router.post('/info', projectController.getProjectInfo);

module.exports = router;
