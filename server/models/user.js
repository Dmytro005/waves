require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

userSchema.pre('save', async function(next) {
  const user = this;
  if (user.isModified('password')) {
    await bcrypt
      .genSalt(SALT_I)
      .then(salt => bcrypt.hash(user.password, salt))
      .then(hash => (user.password = hash))
      .then(() => next())
      .catch(error => next(error));
  } else {
    next();
  }
});

//console.log('require', process.env.);

userSchema.methods.comparePassword = async function(password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    return new Error(error);
  }
};

userSchema.methods.generateToken = async function() {
  const token = jwt.sign(this._id.toHexString(), process.env.SECRET);
  this.token = token;
  const { token: savedToken } = await this.save();
  return savedToken;
};

const User = mongoose.model('User', userSchema);

module.exports = { User };
