const express = require('express'),
  router = express.Router();

router.use('/api/users', require('./users'));
router.use('/api/product', require('./product'));

module.exports = router;
