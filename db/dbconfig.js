/*
--- Pre Setup
npm install sequelize -S
npm install pg pg-hstore -S

--- to run the db from heroku type in the command
~ heroku pg:psql --app shock18
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
      });
  }

  global.db = {
    Sequelize: Sequelize,
    sequelize: sequelize
  }
}


module.exports = global.db

