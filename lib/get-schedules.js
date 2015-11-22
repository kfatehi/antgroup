var Promise = require('bluebird')
var request = require('request');
var moment = require('moment');
var _ = require('lodash');

var cache = {}

module.exports = function(ids) {
  return Promise.map(ids, function(id) {
    return getSchedule(id)
  })
}

function getSchedule(user) {
  var id = user.antPlannerId
  return new Promise(function(resolve, reject) {
    if (cache[id]) {
      console.log('resolving cached schedule');
      resolve(cache[id])
    } else {
      var url = 'http://antplanner.appspot.com/schedule/load?username='+id;
      request.get(url, function(err, resp) {
        if (err) {
          console.log('antplanner req error', err);
          return reject(err);
        }
        else {
          cache[id] = JSON.parse(resp.body)
          console.log('cached schedule');
          resolve(cache[id])
        }
      })
    }
  }).then(function(res) {
    if (res.success) {
      return {
        id: id,
        events: subtractTime(JSON.parse(res.data), 7, 'hours')
      }
    } else {
      return null
    }
  });
}

function subtractTime(events, amt, unit) {
  return _.map(events, function(e) {
    e.start = moment(e.start).subtract(amt, unit).toDate()
    e.end = moment(e.end).subtract(amt, unit).toDate()
    return e
  })
}
