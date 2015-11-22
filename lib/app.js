var Promise = require('bluebird')
var getSchedules = require('./get-schedules');
var express = require('express');
var cors = require('cors');
var app = express();
var _ = require('lodash');

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

app.post('/session', function(req, res, next) {
  User.login(req.body.email, req.body.password)
  .then(function(user) {
    if (user) {
      return res.status(201).json({ id: user.id })
    } else {
      return res.sendStatus(403).end()
    }
  }).catch(next)
})

app.get('/session', authorizeUser, function(req, res) {
  console.log('GET SESSION HIT');
  User.findById(req.session.userId)
  .then(function(user) {
    if (!user) {
      throw new Error('Not found');
    }
    return [user, user.getGroups()];
  }).spread(function(user, groups) {
    return [user, Promise.map(groups, function(group) {
      return group.getUsers().then(function(members) {
        return {
          id: group.id,
          name: group.name,
          ownerId: group.ownerId,
          members: _.map(members, function(user) {
            return {
              id: user.id,
              name: user.name,
              email: user.email
            }
          })
        }
      })
    })];
  }).spread(function(user, groups) {
    return res.status(201).json({ 
      id: user.id,
      name: user.name,
      email: user.email,
      groups: groups
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
    res.status(403).end()
  }
}

var Group = models.Group;

app.post('/group', authorizeUser, function(req, res, next) {
  if (req.body.name && req.body.name.length > 0) {
    return Group.create({ name: req.body.name, ownerId: req.session.userId }).then(function(group) {
      return Membership.create({
        userId: req.session.userId,
        groupId: group.id
      }).then(function() {
        return res.json(group)
      })
    }).catch(next)
  } else {
    res.status(400).json({ errors: ['Group name is required'] })
  }
})

function authorizeGroupOwner(req, res, next) {
  return Group.checkOwner(req.params.groupId, req.session.userId).then(function(group) {
    if (group) {
      req.currentGroup = group
      next();
    } else {
      next(new Error('Not authorized'))
    }
  }).catch(next)
}

app.delete('/group/:groupId', authorizeUser, authorizeGroupOwner, function(req, res, next) {
  req.currentGroup.destroy().then(function() {
    res.status(200).send('ok')
  }).catch(next)
})

var Membership = models.Membership;

app.post('/group/:groupId/members', authorizeUser, authorizeGroupOwner, function(req, res, next) {
  User.findOne({
    where: { email: req.body.email }
  }).then(function(user) {
    if (user) {
      var attrs = {
        userId: user.id,
        groupId: parseInt(req.params.groupId)
      }
      return Membership.findOne({ where: attrs }).then(function(mem) {
        if (mem) return mem;
        else return Membership.create(attrs)
      }).then(function() {
        res.status(200).send('ok')
      })
    } else {
      res.status(404).send('user not found. later we can send invite')
    }
  }).catch(next)
})

app.post('/schedules', authorizeUser, function(req, res, next){
  return User.findAll({
    attributes: ['antPlannerId'],
    where: { email: { $in: req.body.emails } }
  }).then(getSchedules).then(function(result) {
    res.json(result)
  }).catch(function(err) {
    res.sendStatus(500).end()
  });
});


module.exports = app
