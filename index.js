var express = require('express');
var app = express();
var path = require('path');

var port = process.env.PORT || '8080';
var db = require('./db/models')
app.use(express.static('app'));

// During my MVP, an HIR told me I should always use static when creating a Single Page App.

// original code Roni wrote
// app.get('/', function(req, res) {
//     res.sendFile(path.join(__dirname + '/index.html'));
// });
// Sync models with database then run server
db.sequelize.sync().then(function() {
  http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
  });
});
app.listen(port, function () {
  console.log('Example app listening on port 8080!');
});
