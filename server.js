var express = require('express');

var rest = require('restler');

var app = express();

app.get('/', function(req, res){
	res.send("hi, the server worked")
})

app.listen(3000, function() {
  console.log('listening');
  rest.get('http://www.outloud.io:8080/api/feed').on('complete', function(data) {
    console.log(data); // auto convert to object
  });

});
