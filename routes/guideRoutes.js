const express = require('express');
const guideController = require('../controllers/guideController');

const router = express.Router();

router.post('/all', guideController.getAllGuides);
router.post('/add', guideController.addNewGuide);
router.post('/update', guideController.updateGuide);
router.post('/delete', guideController.deleteGuides);
router.post('/updateRoles', guideController.updateGuideRoles);

module.exports = router;
