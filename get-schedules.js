var Promise = require('bluebird')
var request = require('request');
var moment = require('moment');
var _ = require('lodash');

module.exports = function(ids) {
  return Promise.map(ids, function(id) {
    return getSchedule(id)
  })
}

function getSchedule(id) {
  return new Promise(function(resolve, reject) {
    var url = 'http://antplanner.appspot.com/schedule/load?username='+id;
    request.get(url, function(err, resp) {
      if (err) {
        console.log('antplanner req error', err);
        return reject(err);
      }
      else resolve(resp.body)
    })
  }).then(function(res) {
    return {
      id: id,
      events: fixTimezones(JSON.parse(JSON.parse(res).data))
    }
  });
}

function fixTimezones(events) {
  _.map(events, function(e) {
    sub(e, 'start')
    sub(e, 'end')
    return e
  })
}


function sub(e, key) {
  console.log(e);
  e[key] = moment(e[key]).subtract(5, 'hours').toDate()
  return e;
}
