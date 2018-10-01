require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

const mongoose = require('./config/mongoose');
mongoose.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser());

const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log('server running', port);
});

app.use(require('./controllers'));

module.exports = app;
