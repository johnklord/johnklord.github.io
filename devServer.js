module.exports = function(){
  var express= require('express');
  var path =require('path');
  var app = express();

  app.use('/', express.static(path.join(__dirname, 'public')))

  var port = 1337;
  var host = "127.0.0.1";

  var server = app.listen(port,host,function(){
    console.log('started dev server...');
  })
}


