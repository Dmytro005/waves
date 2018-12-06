const express = require('express'),
  router = express.Router();

const mongoose = require('mongoose');

const { auth } = require('../middleware/auth');
const { admin } = require('../middleware/admin');

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
      woods: await Wood.find({}),
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
      article: await Product.create({ ...req.body, sold: false }),
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
    const order = req.query.order ? req.query.order : 'asc';
    const sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    const limit = req.query.limit ? Number(req.query.limit) : 100;

    const articles = await Product.find()
      .populate('brand wood')
      .sort([[sortBy, order]])
      .limit(limit);

    return res.status(200).json({
      articles,
      success: true
    });
  } catch (error) {
    res.status(400).json({
      error: error.message
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
    res.status(400).json({
      error: error.message
    });
  }
});

router.post('/shop', async (req, res) => {
  try {
    let order = req.body.order || 'desc';
    let sortBy = req.body.sortBy || '_id';
    let limit = parseInt(req.body.limit, 10) || 10;
    let skip = parseInt(req.body.skip, 10) || 0;
    let { filters } = req.body;
    let findArgs = { publish: true };

    for (let key in filters) {
      if (filters[key].length > 0) {
        if (key === 'price') {
          findArgs[key] = {
            $gte: filters[key][0],
            $lte: filters[key][1]
          };
        } else {
          findArgs[key] = filters[key];
        }
      }
    }

    const articles = await Product.find(findArgs)
      .populate('brand wood')
      .sort({ [sortBy]: order })
      .skip(skip)
      .limit(limit);

    return res.status(200).json({
      articles,
      size: articles.length
    });
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
    throw new Error(error);
  }
});

module.exports = router;
