/*
~~~ Pre Setup
npm install sequelize -S
npm install pg pg-hstore -S
*/

var Sequelize = require('sequelize');
var db = new Sequelize('shock', '', '',{
  dialect:'postgres',
});

exports.Users = db.define('users', {
  id            : { type: Sequelize.INTEGER, primaryKey: true},
  first_name    : Sequelize.STRING,
  last_name     : Sequelize.STRING,
  username      : Sequelize.STRING,
  address       : Sequelize.STRING,
  phone_number  : Sequelize.STRING,
  email         : Sequelize.STRING,
  createdAt     : Sequelize.DATE,
  updatedAt     : Sequelize.DATE
});

exports.Trainers = db.define('users', {
  id            : { type: Sequelize.INTEGER, primaryKey: true},
  id_user       : { type: Sequelize.INTEGER, references : {model: exports.Users, key:exports.Users.id} }
});


exports.Exercises = db.define('exercises', {

  id            :{ type: Sequelize.INTEGER, primaryKey: true},
  name          :Sequelize.STRING,
  type          :Sequelize.STRING,
  description   :Sequelize.STRING,
  id_trainer    :{ type: Sequelize.INTEGER, references : {model: exports.Trainers, key:exports.Trainers.id} }
})

exports.Workout_list = db.define('workout_list', {

  id            :{ type: Sequelize.INTEGER, primaryKey: true},
  date_created  :Sequelize.DATE,
  comments      :Sequelize.STRING,
  id_user       :{ type: Sequelize.INTEGER, references : {model: exports.Users, key:exports.Users.id} },
  id_trainer    :{ type: Sequelize.INTEGER, references : {model: exports.Trainers, key:exports.Trainers.id} }

})
exports.Workouts = db.define('workouts', {
  id              :{ type: Sequelize.INTEGER, primaryKey: true},
  id_workout_list :{ type: Sequelize.INTEGER, references : {model: exports.Workout_list, key:exports.Workout_list.id} },
  comments        :Sequelize.STRING,
  id_exercises    :{ type: Sequelize.INTEGER, references : {model: exports.Exercises, key:exports.Exercises.id} }
})

// link relationships in place of junction table
exports.Users.belongsToMany(exports.Trainers, {through:'Trainer_client'});
exports.Trainers.belongsToMany(exports.Users, {through:'Trainer_client'});



exports.Users.create({first_name:'david', last_name:'dave', username:'helloworld,', address:'1234 hello world', phone_number:3214443333, email:'helloworld@gmail.com'})




// creates a connection to a preexisiting schema
// exports.Users.sync().then(function () {
//   console.log('users synced!')
// });

/*exports.Trainers.sync().then(function () {
  console.log('trainers synced!')
});*/