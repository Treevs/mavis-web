const express = require('express');
const router = express.Router();

router.use('/users', require('./users'));
router.use('/players', require('./players'));

module.exports = router;