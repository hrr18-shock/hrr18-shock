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
});

// truncates all tables before the test
db.sequelize.query('TRUNCATE users Restart Identity Cascade')
.then(function(){
  db.sequelize.query('TRUNCATE trainers Restart Identity Cascade')
.then(function(){
    db.sequelize.query('TRUNCATE trainer_clients Restart Identity Cascade')
.then(function(){
      console.log('done')
    })
  })
})