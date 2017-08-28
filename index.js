var express = require('express');

var app = express();

var port = process.env.PORT || 5000;

app.get('/', function(req, res){
  var ip = req.ip;
  var language = req.headers["accept-language"].match(/(.*?)[;,]/)[1];
  var software = req.headers["user-agent"].match(/\((.*?)\)/)[1];

  var response = {
    "ipaddress": req.ip,
    "language": language,
    "software": software
  }
  res.writeHead(200, {"Content-Type": "text/plain"});
  res.end(JSON.stringify(response));
});


app.listen(port);
