const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const config = require('./config');
const bodyParser = require('body-parser');
const cors = require('cors');
const firebase = require('./firebase');

const app = express();
mongoose.connect(config.MONGODB_URI);

mongoose.Promise = global.Promise;

const activity = require('./routes/Activity');
const event = require('./routes/Event');
const worker = require('./routes/Worker');
const compensation=require('./routes/Compensation');
const configuration=require('./routes/Configuration')
const auth=require('./routes/Auth')


app.use(cors());
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());

app.use('/event', event);
app.use('/worker', worker);
app.use('/activity', activity);
app.use('/compensation', compensation);
app.use('/configuration', configuration);
app.use('/auth', auth);

module.exports = app;
