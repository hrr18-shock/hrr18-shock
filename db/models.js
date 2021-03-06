var sequelize = require('./dbconfig.js');
var Sequelize = require('sequelize')
var db = sequelize.sequelize;

// Define user models for each table
exports.Users = db.define('users', {
  id            : { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
  fb_id         : Sequelize.STRING,
  first_name    : Sequelize.STRING,
  last_name     : Sequelize.STRING,
  username      : Sequelize.STRING,
  // password      : Sequelize.STRING,
  address       : Sequelize.STRING,
  phone_number  : Sequelize.STRING,
  email         : Sequelize.STRING,
  createdAt     : Sequelize.DATE,
  updatedAt     : Sequelize.DATE
});

exports.Trainers = db.define('trainers', {
  id            : { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
  createdAt     : Sequelize.DATE,
  updatedAt     : Sequelize.DATE
});

// exports.Exercises = db.define('exercises', {

//   id            :{ type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
//   name          :Sequelize.STRING,
//   type          :Sequelize.STRING,
//   description   :Sequelize.STRING,
//   id_trainer    :{ type: Sequelize.INTEGER, references : {model: exports.Trainers, key:exports.Trainers.id} }
// })

exports.Workout_list = db.define('workout_list', {

  id            :{ type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
  comments      :Sequelize.STRING,
  user_id       :{ type: Sequelize.INTEGER, references : {model: exports.Users, key:exports.Users.id} },
  trainer_id    :{ type: Sequelize.INTEGER, references : {model: exports.Trainers, key:exports.Trainers.id} },
  createdAt     : Sequelize.DATE,
  updatedAt     : Sequelize.DATE

})
exports.Workouts = db.define('workouts', {
  id               : { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
  workout_list_id  : { type: Sequelize.INTEGER, references : {model: exports.Workout_list, key:exports.Workout_list.id} },
  exercise_name    : Sequelize.STRING,
  comments         : Sequelize.STRING,
  videoLink        : Sequelize.STRING,
  //Todo link to exercise table
  // id_exercises    :{ type: Sequelize.INTEGER, references : {model: exports.Exercises, key:exports.Exercises.id} },
  createdAt        : Sequelize.DATE,
  updatedAt        : Sequelize.DATE
})

exports.Trainer_Client = db.define('trainer_client', {
  id              :{ type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
  createdAt     : Sequelize.DATE,
  updatedAt     : Sequelize.DATE
})
// // link relationships for junction table
exports.Trainers.belongsToMany(exports.Users, {through:'trainer_client', foreignKey:
  'trainer_id'});
exports.Users.belongsToMany(exports.Trainers, {through:'trainer_client', foreignKey: 'user_id'});
exports.Trainers.belongsTo(exports.Users, {foreignKey: 'user_id'})









