var app = require('./lib/app')

var port = (process.env.PORT || 80;
app.listen(port, function(){
  console.log('Web server listening on port '+port);
});
