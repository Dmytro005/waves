const express = require('express'),
  router = express.Router();

const { auth } = require('../middleware/auth');
const { role } = require('../middleware/role');

const { User } = require('../models/user');
const { Brand } = require('../models/brand');

router.post('/brand', auth, role, async (req, res) => {
  try {
    const brand = await Brand.create(req.body);

    return res.status(200).json({
      brand,
      success: true
    });
  } catch (error) {
    res.status(400).json({
      error
    });
  }
});

router.get('/brands', async (req, res) => {
  try {
    return res.status(200).json({
      brands: await Brand.find({}),
      success: true
    });
  } catch (error) {
    res.status(400).json({
      error
    });
  }
});

module.exports = router;
