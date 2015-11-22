'use strict';
module.exports = function(sequelize, DataTypes) {
  var Group = sequelize.define('Group', {
    name: DataTypes.STRING,
    ownerId: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      },
      checkOwner: function(groupId, userId) {
        return Group.findOne({ where: { id: groupId, ownerId: userId }})
      }
    }
  });
  return Group;
};
