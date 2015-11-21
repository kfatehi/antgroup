var getSchedules = require('./get-schedules');
var express = require('express');
var cors = require('cors');
var app = express();

var bodyParser = require('body-parser')
var cookieSession = require('cookie-session')

var models = require('../models')

app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors());

app.use('/app', express.static('client'));

app.use(cookieSession({
  name: 'session',
  keys: ['FAjwffjw33h23rhsf', 'aWFj32jifQFq2F2q3k23fo']
}))

app.get('/', function(req, res) {
  res.sendFile(__dirname+'/landing/index.html');
})

app.post('/schedules', function(req, res, next){
  // auth cookie session
  getSchedules(req.body.ids).then(function(result) {
    res.json(result)
  }).catch(function(err) {
    res.sendStatus(500).end()
  });
});

app.post('/session', function(req, res) {
  User.authenticate(req.body.email, req.body.password)
  .then(function(user) {
    return user.buildLayout()
  }).then(function(layout) {
    req.session.userId = user.id
    res.json(layout)
  }).catch(function(err) {
    res.sendStatus(403).end()
  })
})

app.delete('session', function(req, res) {
  req.session = null
  res.redirect('/')
})

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
      antplannerId: body.antplannerId,
      verified: false
    })
  } else {
    return res.sendStatus(400).json({
      error: 'invalid input'
    })
  }
});

module.exports = app
