const express = require('express');
const router = express.Router();

router.post('/', require('../controllers/authController'));

module.exports = router;