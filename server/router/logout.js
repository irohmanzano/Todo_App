const express = require('express');
const router = express.Router();

router.get('/', require('../controllers/logoutController'));

module.exports = router;