var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var port = process.env.PORT || '8080';
var models = require('./db/models.js')
var db = require('./db/dbconfig.js')
var controller = require('./controllers/mainController.js')
app.use(express.static('app'));
app.use(bodyParser.json());
// During my MVP, an HIR told me I should always use static when creating a Single Page App.

// original code Roni wrote
// app.get('/', function(req, res) {
//     res.sendFile(path.join(__dirname + '/index.html'));
// });

app.get('/fetchUser/:username', function(req, res){
  // DB helper function to retrieve user by name or id
  controller.usersView.userLogin(req, res)
})
app.get('/fetchTrainer/:username', function(req, res){
  // DB helper function to retrieve user by name or id
  controller.usersView.trainerLogin(req, res)
})
app.post('/signUp', function(req, res){
  // DB helper function to create a new user
  controller.usersView.signUp(req, res)
})
app.get('/displayTrainers', function(req, res){
  controller.usersView.displayTrainers(req, res)
})

app.post('/selectTrainer', function(req, res){
  controller.usersView.selectTrainer(req, res)
})
// Workout Listeners
app.get('/fetchWorkoutLists/client/:id', function(req, res){
  controller.clientsView.fetchWorkoutLists(req, res)
})
app.get('/fetchWorkout/workoutlist/:id', function(req, res){
  controller.clientsView.fetchWorkout(req, res)
})
// create workout for client
app.post('/clients/:id/:id/workout', function(req, res){
  //create new workout
  res.json('it worked');
})

// get all clients for trainer
app.get('/clients/:id', function(req, res){
  res.json([{name: 'Jim', id:4}]);
})


// get all workouts for client
// app.get('/clients/:id/:id', function(req, res){

// create workout for client
app.post('/clients/:id/:id/workout', function(req, res){
  //create new workout
  res.json('it worked');
})

// get all clients for trainer
app.get('/clients/:id', function(req, res){
  res.json([{name: 'Jim', id:2}]);
})

// get all workouts for client
app.get('/clients/:id/:id', function(req, res){
  res.json([{e1: 'Squats', d1: '10 reps', e2: 'deadlift', d2: '5 reps'}]);
})


// create workout from trainer view
app.post('/trainer/createWorkouts', function(req, res){
  console.log(req)
  controller.trainersView.addToWorkoutList(req, res)
})

//grab all of trainers clients
app.get('/trainer/:id/grabClients', function(req, res){
  console.log(req)
  controller.trainersView.grabClients(req, res)
})

// Sync models with database then open port
db.sequelize.sync().then(function() {
  console.log(port)
  app.listen(port, function () {
    console.log(port,' is running fine!');
  });
});
