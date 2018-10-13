require('dotenv').config();
const mongoose = require('mongoose');

const brandSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    maxlength: 1000
  }
});

const Brand = mongoose.model('Brand', brandSchema);

module.exports = { Brand };
