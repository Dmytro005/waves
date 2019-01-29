const express = require('express'),
  router = express.Router();

router.use('/api/users', require('./users'));
router.use('/api/product', require('./product'));

if(process.env.NODE_ENV === 'production') {
  router.get('/*', async (req, res) => {
    const path = require('path');
    res.sendFile(path.resolve(__dirname, '../../client', 'build', 'index.html'));
  });
}

module.exports = router;
