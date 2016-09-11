 /* You'll need to have MySQL running and your Node server running
 * for these tests to pass. */

var postgres = require('pg');
var expect = require('chai').expect;
var models = require('../db/models.js')
var controllers = require('../controllers/mainController.js')
var db = require('../db/dbconfig.js')
describe('database queries', function() {
  var dummyUsers = {
    one: {
      first_name:'inor',
      last_name:'mes',
      username:'inormes',
      address:'1234 inormes',
      phone_number:'1234568910',
      email:'inormes@gmail.com'
    },
    two: {
      first_name:'kale',
      last_name:'evad',
      username:'kaleevad',
      address:'1234 kaleevad',
      phone_number:'1233568910',
      email:'kaleevad@gmail.com'
    },
    three: {
      first_name:'hello',
      last_name:'world',
      username:'hellworld',
      address:'1234 helloworld',
      phone_number:'1234568911',
      email:'helloworld@gmail.com'
    },
    four: {
      first_name:'foo',
      last_name:'bar',
      username:'foobar',
      address:'1234 foobar',
      phone_number:'2234568911',
      email:'foobar@gmail.com'
    }
  }
  var dummyWorkouts = {

    workoutListOne: {
      comments:'beginner exercise routine',
      trainer_id: 1,
      user_id: 4
    },

    e1: {
      workout_list_id: 1,
      exercise_name: 'push ups',
      comments: '5 x 10',
      videoLink: 'https://www.youtube.com/watch?v=IODxDxX7oi4'
    },
    e2: {
      workout_list_id: 1,
      exercise_name: 'pull ups',
      comments: '5 x 10',
      videoLink: 'https://www.youtube.com/watch?v=Dy28eq2PjcM'

    },
    e3: {
      workout_list_id: 1,
      exercise_name: 'sit ups',
      comments: '5 x 10',
      videoLink: 'https://www.youtube.com/watch?v=-4qRntuXBSc'
    }

  }





/*
  beforeEach(function(done) {
    // use dummy data to insert into Users table
    models.Users.create({first_name:dummyUsers.one.first_name, last_name:dummyUsers.one.last_name, username:dummyUsers.one.username, address:dummyUsers.one.address, phone_number:dummyUsers.one.phone_number, email:dummyUsers.one.email})
    .then(function(results){
      models.Users.create({first_name:dummyUsers.two.first_name, last_name:dummyUsers.two.last_name, username:dummyUsers.two.username, address:dummyUsers.two.address, phone_number:dummyUsers.two.phone_number, email:dummyUsers.two.email})
      .then(function(results){
        models.Users.create({first_name:dummyUsers.three.first_name, last_name:dummyUsers.three.last_name, username:dummyUsers.three.username, address:dummyUsers.three.address, phone_number:dummyUsers.three.phone_number, email:dummyUsers.three.email}).then(function(results){
      models.Users.create({first_name:dummyUsers.four.first_name, last_name:dummyUsers.four.last_name, username:dummyUsers.four.username, address:dummyUsers.four.address, phone_number:dummyUsers.four.phone_number, email:dummyUsers.four.email})
      .then(function(results){
        done();
          })
        })
      })
    })

  });*/

  // afterEach(function(done) {
  //   /* Empty the db table before each test so that multiple tests
  //    * (or repeated runs of the tests) won't screw each other up: */
  //   db.sequelize.query('TRUNCATE users Restart Identity Cascade')
  //   .then(function(){
  //     db.sequelize.query('TRUNCATE trainers Restart Identity Cascade')
  //   .then(function(){
  //       db.sequelize.query('TRUNCATE trainer_clients Restart Identity Cascade')
  //   .then(function(){
  //         done();
  //       })
  //     })
  //   })

  // });

  it('should add user to users table', function(done) {
      models.Users.create({first_name:dummyUsers.one.first_name, last_name:dummyUsers.one.last_name, username:dummyUsers.one.username, address:dummyUsers.one.address, phone_number:dummyUsers.one.phone_number, email:dummyUsers.one.email})
      .then(function(results){
        models.Users.create({first_name:dummyUsers.two.first_name, last_name:dummyUsers.two.last_name, username:dummyUsers.two.username, address:dummyUsers.two.address, phone_number:dummyUsers.two.phone_number, email:dummyUsers.two.email})
        .then(function(results){
          models.Users.create({first_name:dummyUsers.three.first_name, last_name:dummyUsers.three.last_name, username:dummyUsers.three.username, address:dummyUsers.three.address, phone_number:dummyUsers.three.phone_number, email:dummyUsers.three.email}).then(function(results){
        models.Users.create({first_name:dummyUsers.four.first_name, last_name:dummyUsers.four.last_name, username:dummyUsers.four.username, address:dummyUsers.four.address, phone_number:dummyUsers.four.phone_number, email:dummyUsers.four.email})
        .then(function(results){
          db.sequelize.query('select * from users').then(function(result){
            // console.log(result[0])
            expect(result[0][0].username).to.equal(dummyUsers.one.username);
            expect(result[0][1].username).to.equal(dummyUsers.two.username);
            expect(result[0][2].username).to.equal(dummyUsers.three.username);
            expect(result[0][3].username).to.equal(dummyUsers.four.username);
            done();
          })

            })
          })
        })
      })



  });

  it('it should add trainer to trainer table', function(done) {
    models.Trainers.create({user_id:1}).then(function(results){
      db.sequelize.query('select users.username from users INNER JOIN trainers ON users.id = trainers.user_id').then(function(result){
        expect(result[0][0].username === dummyUsers.one.username)
      })


    }).then(function(results){
      models.Trainers.create({user_id:2}).then(function(results){
      db.sequelize.query('select users.username from users INNER JOIN trainers ON users.id = trainers.user_id').then(function(result){
        expect(result[0][0].username === dummyUsers.two.username)
      })

        done();
      })
    })

  });

  it('should add a client trainer row', function(done){
    models.Trainer_Client.create({trainer_id:1 ,user_id:4})
    done();
  })

  it('should return all trainers', function(done){

    db.sequelize.query('select users.username from users INNER JOIN trainers ON users.id = trainers.user_id').then(function(result){
        // console.log(result)
        expect(result[0][0].username === dummyUsers.one.username)
        expect(result[0][1].username === dummyUsers.two.username)
        done();
    })
  })

  it('should return all of a trainers clients', function(done){
    // this grabs all the trainer and clients
    models.Trainers.findAll({include:[models.Users] }).then(function(trainers){
        // console.log(JSON.stringify(trainers))
        expect(trainers[0].dataValues.username === dummyUsers.one.username)
        expect(trainers[0].dataValues.users[0].dataValues === dummyUsers.four.username)
        done();
      })
  })

  it('should add a workout list', function(done){
    models.Workout_list.create(
      {
        comments: dummyWorkouts.workoutListOne.comments,
        user_id: dummyWorkouts.workoutListOne.user_id,
        trainer_id: dummyWorkouts.workoutListOne.trainer_id
      }
    )
    .then(function(res){
      // console.log(res);
      done();
    })
    //TODO add expect later
  })

  it('should add workouts to workout list', function(done){
    models.Workouts.create({
      workout_list_id: dummyWorkouts.e1.workout_list_id,
      exercise_name: dummyWorkouts.e1.exercise_name,
      comments: dummyWorkouts.e1.comments,
      videoLink: dummyWorkouts.e1.videoLink
    })
    .then(function(res){
    models.Workouts.create({
      workout_list_id: dummyWorkouts.e2.workout_list_id,
      exercise_name: dummyWorkouts.e2.exercise_name,
      comments: dummyWorkouts.e2.comments,
      videoLink: dummyWorkouts.e2.videoLink

    })
    .then(function(res){
    models.Workouts.create({
      workout_list_id: dummyWorkouts.e3.workout_list_id,
      exercise_name: dummyWorkouts.e3.exercise_name,
      comments: dummyWorkouts.e3.comments,
      videoLink: dummyWorkouts.e3.videoLink

    })
    .then(function(res){
      done();
    })
    })
    })
    //TODO: add expects
  })

  it('should be able to grab list of workouts related to trainer or user', function(done){
    models.Workout_list.findAll({where:{
        $or:[
          {
            user_id: 4
          },
          {
            trainer_id: 1
          }
        ] }
      })
    .then(function(res){
      // console.log(res)
      done();
    })
        //TODO: add expects

  })

  it('should be able to grab all workouts from a list', function(done){
    models.Workouts.findAll({where:{
        $or:[
          {
            workout_list_id: 1
          }
        ] }
      })
    .then(function(res){
      console.log(res)
      done();
    })
        //TODO: add expects
  })



});



// truncates all tables before the test
db.sequelize.query('TRUNCATE users Restart Identity Cascade')
.then(function(){
  db.sequelize.query('TRUNCATE trainers Restart Identity Cascade')
.then(function(){
    db.sequelize.query('TRUNCATE trainer_clients Restart Identity Cascade')
.then(function(){
      db.sequelize.query('TRUNCATE workout_lists Restart Identity Cascade')
.then(function(){
        db.sequelize.query('TRUNCATE workouts Restart Identity Cascade')
.then(function(){
          console.log('truncated')
        })
      })
    })
  })
})