// Main router

const express = require('express');
const router  = express.Router();

// Root : /api/v1
router.get('/', function (req, res) {
  res.send("Hello");
});

// Register all other routes
router.use('/', require('./job'));
router.use('/', require('./users')); // Change to singular
router.use('/', require('./job_submission'));
router.use('/', require('./company'));

module.exports = router;
