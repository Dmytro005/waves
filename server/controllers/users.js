const express = require('express'),
  router = express.Router();

const { User } = require('../models/user');
const { Product } = require('../models/product');

const { auth } = require('../middleware/auth');
const { admin } = require('../middleware/admin');

const mongoose = require('mongoose');

const formidable = require('express-formidable');

const cloudinary = require('../config/cloudinary');

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
      registerSuccess: true,
      user
    });
  } catch (error) {
    res.status(500).json({ registerSuccess: false, error: error.message });
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
            res.status(401).json({
              loginSuccess: false,
              message: 'Wrong password'
            });
          }
        })

        .catch(error => {
          console.error(error);
          res.status(401).json({
            loginSuccess: false,
            message: error.message
          });
        });
    } else {
      res.status(401).json({
        loginSuccess: false,
        message: 'Auth failed, email not found'
      });
    }
  } catch (error) {
    return res.status(500).json({
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

router.post('/image/upload', auth, admin, formidable(), (req, res) => {
  try {
    cloudinary.uploader.upload(
      req.files.file.path,

      result => {
        return res.status(200).json({
          public_id: result.public_id,
          url: result.url
        });
      },

      {
        public_id: `${Date.now()}`,
        resource_type: 'auto'
      }
    );
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      uploadSuccess: false,
      error
    });
  }
});

router.delete('/image/unlink', auth, admin, (req, res) => {
  try {
    const { public_id } = req.body;
    cloudinary.uploader.destroy(public_id, error => {
      return res.status(200).json({
        unlinkSuccess: true
      });
    });
    return res.status(200);
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      unlinkSuccess: false,
      error: error.message
    });
  }
});

router.post('/addToCart', auth, (req, res) => {
  try {
    User.findById(req.user._id, (err, doc) => {
      let dublicate = false;

      doc.cart.forEach(item => {
        // Check if user have dublicated item in the cart
        if (item.id == req.query.productId) {
          dublicate = true;
        }
      });

      if (dublicate) {
        User.findOneAndUpdate(
          {
            _id: req.user._id,
            'cart.id': mongoose.Types.ObjectId(req.query.productId)
          },
          {
            $inc: { 'cart.$.quantity': 1 }
          },
          {
            new: true
          },
          (err, doc) => {
            if (err) return res.json({ success: false, err });
            res.status(200).json(doc.cart);
          }
        );
      } else {
        User.findByIdAndUpdate(
          { _id: req.user._id },
          {
            $push: {
              cart: {
                id: mongoose.Types.ObjectId(req.query.productId),
                quantity: 1,
                date: Date.now()
              }
            }
          },
          { new: true },
          function(err, doc) {
            if (err) return res.json({ success: false, err });
            res.status(200).json(doc.cart);
          }
        );
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      unlinkSuccess: false,
      error: error.message
    });
  }
});

router.get('/removeFromCart', auth, async (req, res) => {
  try {
    const doc = await User.findOneAndUpdate(
      {
        _id: req.user._id
      },
      {
        $pull: {
          cart: { id: mongoose.Types.ObjectId(req.query.id) }
        }
      },
      {
        new: true
      }
    );

    let { cart } = doc.toObject();

    let arr = cart.map(item => {
      return mongoose.Types.ObjectId(item.id);
    });

    const cartDetail = await Product.find({ _id: { $in: arr } }).populate(
      'brand wood'
    );

    return res.status(200).json({
      cartDetail,
      cart,
      success: true
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      unlinkSuccess: false,
      error: error.message
    });
  }
});

module.exports = router;
