const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SALT_I = 10;

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minLength: 5
  },
  name: {
    type: String,
    required: true,
    maxLength: 100
  },
  name: {
    type: String,
    required: true,
    maxLength: 100
  },
  cart: {
    type: Array,
    default: []
  },
  history: {
    type: Array,
    default: []
  },
  role: {
    type: Number,
    default: 0
  },
  token: {
    type: String
  }
});

userSchema.pre('save', function(next) {
  if (this.isModified('password')) {
    bcrypt.genSalt(SALT_I, (err, salt) => {
      if (err) return next(err);

      bcrypt.hash(this.password, salt, (err, hash) => {
        if (err) return next(err);
        this.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = (password, cb) => {};

const User = mongoose.model('User', userSchema);

module.exports = { User };
