const express = require('express');
const adminController = require('../controllers/adminController');

const router = express.Router();

router.get('/', adminController.getAdminDetails);
router.post('/', adminController.addNewAdminDetails);

module.exports = router;
