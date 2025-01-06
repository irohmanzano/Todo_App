const express = require('express');
const router = express.Router();

router.post('/', require('../controllers/registerController'));

module.exports = router;