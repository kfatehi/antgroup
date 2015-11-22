'use strict';
var Promise = require('bluebird')
var uuid = require('uuid');
var bcrypt = require('bcrypt');

var hashPassword = function(password) {
  return new Promise(function(resolve, reject) {
    bcrypt.genSalt(10, function(err, salt) {
      if (err) return reject(err);
      bcrypt.hash(password, salt, function(err, hash) {
        if (err) return reject(err);
        resolve(hash);
      });
    });
  });
}


module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    antPlannerId: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        User.belongsToMany(models.Group, { through: models.Membership })
      },
      login: function(email, password) {
        return User.findOne({ where: { email: email } })
        .then(function(user) {
          return user.comparePassword(password)
        })
      },
      register: function(body) {
        return new Promise(function(resolve, reject) {
          var errors = []
          if (body.name.length <= 1)
            errors.push('Name too short')
          if (body.antPlannerId <= 1)
            errors.push('AntplannerId is required')
          if (!body.email.match(/.+@.+\..+/))
            errors.push('Email is invalid')
          if (body.password !== body.confirmPassword)
            errors.push('Passwords do not match')
          if (body.password.length <= 6)
            errors.push('Password must be at least 6 characters')

          if (errors.length > 0) {
            var err = new Error('ValidationError');
            err.errors = errors
            return reject(err);
          } else resolve();
        }).then(function() {
          return User.findOne({ where: { email: body.email } })
        }).then(function(user) {
          if (user) {
            var err = new Error('UserConflictError');
            err.errors = ['User already exists']
            throw err
          } else {
            return hashPassword(body.password)
          }
        }).then(function(hash) {
          body.password = hash;
          return User.create(body)
        })
      }
    },
    instanceMethods: {
      comparePassword: function(password) {
        var user = this;
        return new Promise(function(resolve, reject) {
          if (!password) return reject();
          bcrypt.compare(password, user.password || '', function (err, isValid) {
            if (err) throw err;
            if (isValid) resolve(user);
            else reject(new Error('bad password'));
          });
        });
      }
    }
  });
  return User;
};
