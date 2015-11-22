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
        console.log(groupId, userId);
        Group.findOne({ where: { id: groupId, ownerId: userId }}).then(function(grp) {
          if (grp) return resolve(grp);
          else throw new Error('Not the owner');
        })
      }
    }
  });
  return Group;
};
