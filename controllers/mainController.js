var models = require('../db/models.js');
var async = require('async');
// client to database methods

//TODO:
/*
Grab All Trainers in sign up page;
Add FB ID to the database
*/
module.exports = {
  trainersView:{
    // done away with adding clients
/*    addClient: function(req, res){
      models.Users.findOrCreate({where:{
        $or:[
          {
            username: req.username
          },
          {
            email: req.email
          }
        ] }, defaults: {
          first_name: req.firstName, last_name:req.lastName, address:req.address, phone_number:req.phoneNumber, email:req.email, username:req.username
        }
      }).then(function(user){
        res.send(user)
      });
    },
    searchClients: function(req, res){

    },*/
    addToWorkoutList: function(req, res){
      models.Workout_list.create(
        {
          comments: req.body.workoutList.comments,
          user_id: req.body.workoutList.user_id,
          trainer_id: req.body.workoutList.trainer_id
        }
      )
      .then(function(result){
        var workoutListID = result.id;
        var workouts = req.body.workouts;
        async.each(workouts, function(workoutItem, callback){
          if(workoutItem.exercise_name && workoutItem.comments && workoutItem.videoLink){

            models.Workouts.create({
              workout_list_id: workoutListID,
              exercise_name: workoutItem.exercise_name,
              comments: workoutItem.comments,
              videoLink: workoutItem.videoLink
            })
          }
          callback()
        })

      })
    },
    //TO DO view only the selected client
    viewWorkouts: function(req, res){
      models.Workout_list.findAll({where:{
          $or:[
            {
              trainer_id: req.params.trainer_id
            }
          ] }
        })
      .then(function(response){

      })
    },
    //TODO grab all of the trainers clients
    grabClients: function(req, res){
      models.Trainers.findAll({where:{id:req.params.id}, include:[models.Users] }).then(function(trainers){
          res.send(trainers)
        })
    }

  },
  clientsView:{
    fetchWorkoutLists: function(req, res){
      models.Workout_list.findAll({where:{
          $or:[
            {
              user_id: req.params.id
            }
          ] }
        })
      .then(function(response){
        res.send(response)
      })
    },
    fetchWorkout: function(req, res){
      models.Workouts.findAll({where:{
          $or:[
            {
              workout_list_id: req.params.id
            }
          ] }
        })
      .then(function(result){
        res.send(result)
      })
    }

  },
  usersView:{
    // TODO: add trainer during signup for now
    displayTrainers: function(req, res){
      db.sequelize.query('select * from users INNER JOIN trainers ON users.id = trainers.user_id').then(function(result){
            res.send(result[0])
      })
    },
    selectTrainer: function(req, res, user){
      models.Trainer_Client.create({trainer_id: req.body.trainer_id,
        user_id: user[0].dataValues.id
      }).then(function(response){
        res.send('trainer selected')
      })
    },
    signUp: function(req, res){

            console.log('signed up as trainer')
      models.Users.findOrCreate({where:{
        $or:[
          {
            username: req.body.userName
          },
          {
            fb_id: req.body.fbID
          }
        ] }, defaults: {
         fb_id: req.body.fbID, username: req.body.userName
        }
      }).then(function(user){
        if(req.body.trainer_id){
          module.exports.usersView.selectTrainer(req, res, user)

        } else if (req.body.userRole === 'trainer') {
          models.Trainers.findOrCreate({where: {user_id: user[0].dataValues.id}}).then(function(results){

            })

        }
      });
    },
    userLogin: function(req, res){
      models.Users.find({where:{
        $or:[
          {
            username: req.params.username
          },
          {
            email: req.params.email
          },
          {
            fb_id: req.params.fbID
          }
        ] }
      }).then(function(user){
        if(user){
          res.send(user)
        } else {
          res.send('invalid user')
        }
      }).catch(function(err){
        res.send('invalid user')
        console.log(err)
      });
    },
    trainerLogin: function(req, res){
      models.Users.find({where:{
        $or:[
          {
            username: req.params.username
          },
          {
            email: req.params.email
          }
        ] }
      }).then(function(user){
        console.log(user.dataValues.id)
        models.Trainers.findOne({where:
          {user_id: user.dataValues.id}
        }).then(function(trainer){
          console.log(trainer)
          if(trainer){
            res.send(trainer)
            // res.send('trainer has been found')
          } else {
            res.send('not trainer')
          }
        }).catch(function(err){
          //this catch statement doesnt seem to be working
          console.log(err)
          // res.send('not a trainer')
        })
      }).catch(function(err){
        res.send('invalid user')
        console.log(err)
      });
    }
  },
  exercises:{

  }


}

