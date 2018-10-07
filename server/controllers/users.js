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
    const user = await User.findOne({ email });

    if (user !== null) {
      await user
        .comparePassword(req.body.password)
        .then(async data => {
          if (data) {
            const token = await user.generateToken();
            res
              .cookie('w-auth', token)
              .status(200)
              .json({
                loginSuccess: true,
                message: 'Logging you in'
              });
          } else {
            res.status(400).json({
              loginSuccess: false,
              message: 'Wrong password'
            });
          }
        })

        .catch(error => {
          console.error(error);
          res.status(400).json({
            loginSuccess: false,
            error
          });
        });
    } else {
      res.status(400).json({
        loginSuccess: false,
        message: 'Auth failed, email not found'
      });
    }
  } catch (error) {
    return res.status(400).json({
      loginSuccess: false,
      error
    });
  }
});

module.exports = router;
