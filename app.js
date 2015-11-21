var getSchedules = require('./get-schedules');
var express = require('express');
var cors = require('cors');
var app = express();

var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors());

app.use(express.static('client'));

app.post('/schedules', function(req, res, next){
  getSchedules(req.body.ids).then(function(result) {
    res.json(result)
  }).catch(function(err) {
    res.sendStatus(500).end()
  });
});

app.post('/register', function(req, res) {
  // name
  // email
  // password
  // password_confirmation
  // antplanner_id
  var body = req.body
  if (
    body.name.length >= 1 &&
    body.antplanner_id >= 1 &&
    body.email.match(/.+@.+\..+/) &&
    body.password === req.body.password_confirmation &&
    body.password.length >= 6
  ) {
  } else {
    return res.sendStatus(400).json({
      error: 'invalid input'
    })
  }
});

module.exports = app
