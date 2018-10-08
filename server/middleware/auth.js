const { User } = require('../models/user');

let auth = async (req, res, next) => {
  try {
    const token = req.cookies.w_auth;
    const user = await User.findByToken(token);

    if (user == null) {
      res.status(401).json({
        isAuth: false,
        message: 'Authentification failed'
      });
    }

    Object.assign(req, { token, user });

    next();
  } catch (error) {
    console.error(error);
    res.status(400).json({
      loginSuccess: false,
      error
    });
  }
};

module.exports = { auth };
