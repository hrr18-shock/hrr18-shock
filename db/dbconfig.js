/*
~~~ Pre Setup
npm install sequelize -S
npm install pg pg-hstore -S
*/
var models = require('./models.js');
// checks if database is already defined
if (!global.hasOwnProperty('db')) {
  var Sequelize = require('sequelize'),
      sequelize = null;
  if (process.env.DATABASE_URL) {
    // the application is executed on Heroku ... use the postgres database
    sequelize = new Sequelize(process.env.DATABASE_URL, {
      logging: false,
      dialectOptions: {
        ssl: true /* for SSL config since Heroku gives you this out of the box */
      }
    });
  } else {
    // the application is executed on the local machine
    console.log('sequelize starting on local host')
      sequelize = new Sequelize('shock', '', '', {
        logging: false,
        dialect:'postgres'
        // dialectOptions: {
        //   ssl: true  for SSL config since Heroku gives you this out of the box
        // }
      });
  }

  global.db = {
    Sequelize: Sequelize,
    sequelize: sequelize
    // User:      sequelize.import(__dirname + '/user'),
    // Trainers:
  }
}

// console.log(global.db)
module.exports = global.db









// old code
// start connection to the sql server
// var Sequelize = require('sequelize');
// var dbURL = process.env.DATABASE_URL === undefined ? 'shock' : process.env.DATABASE_URL;
// db = new Sequelize(dbURL, '', '', {
//   logging: false,
//   dialect:'postgres'
//   // dialectOptions: {
//   //   ssl: true  for SSL config since Heroku gives you this out of the box
//   // }
// });



//TODO: add rest of table syncs
// creates the table if no table has been created yet
// exports.Users.sync().then(function () {
//   console.log('users synced!')
// });
/*exports.Trainers.sync().then(function () {
  console.log('trainers synced!')
});*/



// testing things past here can be ignored
// exports.Users.create({first_name:'david', last_name:'dave', username:'helloworld', address:'1234 hello world', phone_number:3214443333, email:'helloworld@gmail.com'})

