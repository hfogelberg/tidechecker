var express = require('express'),
      app = express(),
      port = process.env.PORT || 80;

app.use('/', express.staitc(__dirname + '/'));
app.listen(port, ()=>{
  console.log('Tidechecker listening on ' + port);
});
