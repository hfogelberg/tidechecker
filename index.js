var express = require('express'),
      app = express(),
      port = process.env.PORT || 80;

app.use('/', express.static(__dirname + '/'));
app.listen(port, ()=>{
  console.log('Tidechecker listening on ' + port);
});
