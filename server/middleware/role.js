let role = async (req, res, next) => {
  try {
    if (req.user.role === 0) {
      throw new Error("You don't have enougn rights to perform this action");
    }
    next();
  } catch (error) {
    res.status(401).json({
      status: false,
      error: error.message
    });
  }
};

module.exports = { role };
