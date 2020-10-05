var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors());

let clicks = {clicks : 0};

app.get('/clicks', (req, res) => {
    res.send(clicks);
})

app.post('/clicks', (req, res) => {
    clicks.clicks++;
    console.log(req.body)
    res.send(clicks)
})

module.exports = app;
