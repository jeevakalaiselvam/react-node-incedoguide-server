const express = require('express');
const auditController = require('../controllers/auditController');

const router = express.Router();

router.post('/mark', auditController.markGuideComplete);

module.exports = router;
