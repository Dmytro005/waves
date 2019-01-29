require('dotenv').config();
const express = require('express');
const nodemon = require('nodemon');

const cors = require('cors');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

const mongoose = require('./config/mongoose');
mongoose.connect();

app.use(express.static('client/build'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: '*',
    credentials: true
  })
);
app.use(cookieParser());

const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log('server running', port);
});

app.use(require('./controllers'));

// This code added so that nodemon could exit process properly
// https://github.com/remy/nodemon/issues/1025
process
  // Handle normal exits
  .on('exit', code => {
    nodemon.emit('quit');
    process.exit(code);
  })

  // Handle CTRL+C
  .on('SIGINT', () => {
    nodemon.emit('quit');
    process.exit(0);
  });

module.exports = app;
