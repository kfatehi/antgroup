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

app.use('/', express.static('landing'));
app.use('/app', express.static('client'));

app.use(cookieSession({
  name: 'session',
  keys: ['FAjwffjw33h23rhsf', 'aWFj32jifQFq2F2q3k23fo']
}))

app.post('/schedules', function(req, res, next){
  // auth cookie session
  getSchedules(req.body.ids).then(function(result) {
    res.json(result)
  }).catch(function(err) {
    res.sendStatus(500).end()
  });
});

app.post('/session', function(req, res) {
  return User.login(req.body.email, req.body.password)
  .then(function(user) {
    req.session.userId = user.id
    return res.status(201).json({ 
      id: user.id
    })
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

var Group = models.Group;

app.post('/group', authorizeUser, function(req, res, next) {
  if (req.body.name && req.body.name.length > 0) {
    Group.create({ name: req.body.name, ownerId: req.session.userId }).then(function(group) {
      res.json(group)
    }).catch(next)
  } else {
    res.status(400).json({ errors: ['Group name is required'] })
  }
})

function authorizeGroupOwner(req, res, next) {
  Group.checkOwner(req.params.groupId, req.session.userId).then(function() {
    next();
  }).catch(function() {
    res.status(403).json({ errors: ['Not authorized'] })
  })
}

app.delete('/group/:groupId', authorizeUser, authorizeGroupOwner, function(req, res, next) {
  res.send("ok")
})

module.exports = app
