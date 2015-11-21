var getSchedules = require('./get-schedules');
var express = require('express');
var cors = require('cors');
var app = express();

var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors());

app.use('/app', express.static('client'));

app.get('/', function(req, res) {
  res.sendFile(__dirname+'/landing/index.html');
})

app.post('/schedules', function(req, res, next){
  getSchedules(req.body.ids).then(function(result) {
    res.json(result)
  }).catch(function(err) {
    res.sendStatus(500).end()
  });
});

app.post('/register', function(req, res) {
  var body = req.body
  if (
    body.name.length >= 1 &&
    body.antplannerId >= 1 &&
    body.email.match(/.+@.+\..+/) &&
    body.password === req.body.passwordConfirmation &&
    body.password.length >= 6
  ) {
    User.createWithPassword(body.password, {
      email: body.email,
      antplannerId: body.antplannerId
    })
  } else {
    return res.sendStatus(400).json({
      error: 'invalid input'
    })
  }
});

module.exports = app
