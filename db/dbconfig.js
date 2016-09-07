var Sequelize = require('sequelize');
var db = new Sequelize('todo', '', '',{
  dialect:'postgres',
});

export.Users = db.define('users', {
  id            : Sequelize.INTEGER,
  first_name    : Sequelize.STRING,
  last_name     : Sequelize.STRING,
  username      : Sequelize.STRING,
  address       : Sequelize.STRING,
  phone_number  : Sequelize.INTEGER,
  email         : Sequelize.STRING
});

// creates a connection to a preexisiting schema
Users.sync().then(function () {
  console.log('synced!')
});
