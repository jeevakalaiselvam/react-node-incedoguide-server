const express = require('express');
const projectController = require('../controllers/projectController');

const router = express.Router();

router.post('/info', projectController.getProjectInfo);
router.post('/updateRoles', projectController.updateProjectRoles);

module.exports = router;
