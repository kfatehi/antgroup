var getSchedules = require('./get-schedules');
var express = require('express');
var cors = require('cors');
var app = express();

var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))

app.use(cors());

app.post('/schedules', function(req, res, next){
  getSchedules(req.body.ids).then(function(result) {
    console.log(result);
    res.json(result)
  }).catch(function(err) {
    console.log(err);
  });
});

app.listen(80, function(){
  console.log('CORS-enabled web server listening on port 80');
});
