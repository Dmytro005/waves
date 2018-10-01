const express = require('express'),
  router = express.Router();
const { User } = require('../models/user');

router.post('/register', (req, res) => {
  const user = new User(req.body);
  user.save((err, doc) => {
    console.log('dima');
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
      userData: doc
    });
  });
});

router.get('/dima', (req, res) => {
  res.status(200).json({
    success: true,
    userData: 'dima'
  });
});

module.exports = router;
