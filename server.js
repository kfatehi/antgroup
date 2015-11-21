var app = require('./app')

app.listen(process.env.PORT || 80, function(){
  console.log('Web server listening on port 80');
});
