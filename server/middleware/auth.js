const { User } = require('../models/user');

let auth = async (req, res, next) => {
  try {
    const token = req.cookies.w_auth;
    const user = await User.findByToken(token).catch(err => {
      throw err;
    });
    Object.assign(req, { token, user });
    next();
  } catch (error) {
    res.status(400).json({
      loginSuccess: false,
      error: error.message
    });
  }
};

module.exports = { auth };
