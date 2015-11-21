var express = require('express');
var cors = require('cors');
var app = express();

var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))

app.use(cors());

app.post('/schedules', function(req, res, next){
  console.log(req.body);
  res.json({msg: 'This is CORS-enabled for all origins!'});
});

app.listen(80, function(){
  console.log('CORS-enabled web server listening on port 80');
});
