var express = require('express');
var app = express();
var path = require('path');

var port = process.env.PORT || '8080';
var models = require('./db/models.js')
var db = require('./db/dbconfig.js')
app.use(express.static('app'));

// During my MVP, an HIR told me I should always use static when creating a Single Page App.

// original code Roni wrote
// app.get('/', function(req, res) {
//     res.sendFile(path.join(__dirname + '/index.html'));
// });





// Sync models with database then open port
db.sequelize.sync().then(function() {
  console.log(port)
  app.listen(port, function () {
    console.log('Example app listening on port 8080!');
  });
});
