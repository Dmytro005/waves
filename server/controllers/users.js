const express = require('express'),
  router = express.Router();
const { User } = require('../models/user');

router.post('/register', async (req, res) => {
  try {
    const user = await User.create(req.body);

    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    res.json({ success: false, error });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });
  } catch (error) {
    return res.json({
      loginSuccess: false,
      message: 'Auth failed, email not found',
      error
    });
  }
});

module.exports = router;
