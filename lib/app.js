var getSchedules = require('./get-schedules');
var express = require('express');
var cors = require('cors');
var app = express();

var bodyParser = require('body-parser')
var cookieSession = require('cookie-session')

var models = require('../models')
var User = models.User;

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
  User.login(req.body.email, req.body.password)
  .then(function(user) {
    req.session.userId = user.id
    return user.buildLayout()
  }).then(function(layout) {
    res.json(layout)
  }).catch(function(err) {
    console.log(err.stack);
    res.sendStatus(403).end()
  })
})

app.delete('/session', function(req, res) {
  req.session = null
  res.redirect('/')
})

app.post('/register', function(req, res) {
  User.register(req.body).then(function(user) {
    res.json({});
  }).catch(function(error) {
    console.log(error.stack);
    res.status(400).json({
      errors: error.errors
    })
  })
});

function authorizeUser(req, res, next) {
  console.log('auth', req.session);
  if (req.session.userId) {
    next();
  } else {
    res.redirect('/')
  }
}

app.post('/group', authorizeUser, function(req, res) {
  console.log('post gorup');
  res.json({})
})

module.exports = app
