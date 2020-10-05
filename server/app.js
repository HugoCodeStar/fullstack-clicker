var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

var pgp = require('pg-promise')(/* options */)
var db = pgp('postgres://postgres:postgres@localhost:5432/postgres')
// Assumes a table clicking with columns id and clicks

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors());

let clicks = {clicks : 0};

db.one('select * from clicking where id = 1')
.then(data => clicks.clicks = data.clicks
)

app.get('/clicks', (req, res) => {
    res.send(clicks);
})

app.post('/clicks', async (req, res) => {
    await db.none('update clicking set clicks = clicks + 1 where id = 1')
    const data = await db.one('select clicks from clicking where id = 1')
    res.send(data)
})

module.exports = app;
