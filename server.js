var app = require('./lib/app')

app.listen(process.env.PORT || 80, function(){
  console.log('Web server listening on port 80');
});
