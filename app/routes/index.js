// Main router

const express = require('express');
const router  = express.Router();

// Root : /api/v1
router.get('/', function (req, res) {
  res.send("Hello");
});

// Register all other routes
router.use('/', require('./job'));
router.use('/', require('./user'));
router.use('/', require('./job_submission'));
router.use('/', require('./company'));
router.use('/', require('./application'));

module.exports = router;
