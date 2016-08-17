const express = require('express');
const router  = express.Router();

// GET /api/v1/users
router.get('/users', function (req, res) {
  res.send("Users root : /api/v1/users");
});

module.exports = router;
