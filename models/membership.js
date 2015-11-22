'use strict';
module.exports = function(sequelize, DataTypes) {
  var Membership = sequelize.define('Membership', {
    userId: DataTypes.INTEGER,
    groupId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Membership;
};
