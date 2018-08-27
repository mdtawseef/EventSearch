
var express = require('express');
var app = express();
var db = require('./db');

var EventController = require('./events/EventController');
app.use('/events',EventController);

module.exports = app;
