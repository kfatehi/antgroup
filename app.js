var getSchedules = require('./get-schedules');
var express = require('express');
var cors = require('cors');
var app = express();

var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors());

app.post('/schedules', function(req, res, next){
  console.log('waa', req.body);
  getSchedules(req.body.ids).then(function(result) {
    res.json(result)
  }).catch(function(err) {
    console.log('error', err);
    res.sendStatus(500).end()
  });
});

module.exports = app
