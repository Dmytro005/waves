const express = require('express'),
  router = express.Router();

const { User } = require('../models/user');

const { auth } = require('../middleware/auth');

router.get('/auth', auth, async (req, res) => {
  const { token, password, ...data } = req.user;
  res.status(200).json({
    isAdmin: data.role ? true : false,
    isAuthed: true,
    ...data
  });
});

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
              .cookie('w_auth', token)
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

router.get('/logout', auth, async (req, res) => {
  try {
    const { token, password, ...user } = req.user;
    User.findByIdAndUpdate(user._id, { token: '' }).then(user => {
      res.status(200).json({
        logoutSuccess: true
      });
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      logoutSuccess: false,
      error
    });
  }
});

module.exports = router;
