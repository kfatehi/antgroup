'use strict';
var Promise = require('bluebird')
var uuid = require('uuid');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    antplannerId: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      },
      register: function(body) {
        return new Promise(function(resolve, reject) {
          var errors = []
          if (body.name.length >= 1)
            errors.push['Name too short']
          if (body.antplannerId >= 1)
            errors.push['AntplannerId is required']
          if (body.email.match(/.+@.+\..+/))
            errors.push['Email is invalid']
          if (body.password === body.passwordConfirmation)
            errors.push['Passwords do not match']
          if (body.password.length >= 6)
            errors.push['Password must be at least 6 characters']

          if (errors.length) return reject(errors);
          console.log('finding');

          User.findOne({ where: { email: body.email } })
          .then(function(user) {
            console.log('got auser?', user);
            if (user) {
              errors.push('That email address is taken.')
              return reject(errors);
            } else {
              return resolve(user);
            }
          }).catch(reject)
        });
      }
    },
    instanceMethods: {
    }
  });
  return User;
};
