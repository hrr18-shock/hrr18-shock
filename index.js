var express = require('express');
var app = express();
var path = require('path');

var port = process.env.PORT || '8080';

app.use(express.static(__dirname));

// During my MVP, an HIR told me I should always use static when creating a Single Page App.

// original code Roni wrote
// app.get('/', function(req, res) {
//     res.sendFile(path.join(__dirname + '/index.html'));
// });

app.listen(port, function () {
  console.log('Example app listening on port 8080!');
});