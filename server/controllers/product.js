const express = require('express'),
  router = express.Router();

const mongoose = require('mongoose');

const { auth } = require('../middleware/auth');
const { admin } = require('../middleware/admin');

const { User } = require('../models/user');
const { Brand } = require('../models/brand');
const { Wood } = require('../models/wood');
const { Product } = require('../models/product');

router.post('/brand', auth, admin, async (req, res) => {
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

router.post('/wood', auth, admin, async (req, res) => {
  try {
    const wood = await Wood.create(req.body);
    return res.status(200).json({
      wood,
      success: true
    });
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.get('/woods', async (req, res) => {
  try {
    return res.status(200).json({
      brands: await Wood.find({}),
      success: true
    });
  } catch (error) {
    res.status(400).json({
      error
    });
  }
});

router.post('/article', auth, admin, async (req, res) => {
  try {
    return res.status(200).json({
      brands: await Product.create(req.body),
      success: true
    });
  } catch ({ message }) {
    res.status(400).json({
      error: message
    });
  }
});

router.get('/articles', async (req, res) => {
  try {
    return res.status(200).json({
      articles: await Product.find({}),
      success: true
    });
  } catch (error) {
    res.status(400).json({
      error
    });
  }
});

router.get('/article_by_id', async (req, res) => {
  try {
    const type = req.query.type;
    let items = req.query.id;

    if (type === 'array') {
      items = items.split(',').map(item => mongoose.Types.ObjectId(item));
    } else {
      items = mongoose.Types.ObjectId(items);
    }

    const articles = await Product.find({ _id: { $in: items } }).populate(
      'brand wood'
    );

    res.status(200).json({
      articles
    });
  } catch (error) {
    throw new Error(error);
    res.status(400).json({
      error: error.message
    });
  }
});

module.exports = router;
