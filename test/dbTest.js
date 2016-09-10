 /* You'll need to have MySQL running and your Node server running
 * for these tests to pass. */

var postgres = require('pg');
var expect = require('chai').expect;
var models = require('../db/models.js')
var controllers = require('../controllers/mainController.js')
var db = require('../db/dbconfig.js')
describe('database queries', function() {

  beforeEach(function(done) {

    /* Empty the db table before each test so that multiple tests
     * (or repeated runs of the tests) won't screw each other up: */

    db.sequelize.query('TRUNCATE users Restart Identity Cascade')
    .then(function(){
      db.sequelize.query('TRUNCATE trainers Restart Identity Cascade')
    .then(function(){
        db.sequelize.query('TRUNCATE trainer_clients Restart Identity Cascade')
    .then(function(){
          done();
        })
      })
    })

  });

  afterEach(function(done) {

    done();
  });
  var dummyUsers = {
    one: {
      first_name:'inor',
      last_name:'mes',
      username:'inormes',
      address:'1234 inormes',
      phone_number:'1234568910',
      email:'inormes@gmail.com'
    }
  }
  it('should add user to users table', function(done) {
    models.Users.create({first_name:dummyUsers.one.first_name, last_name:dummyUsers.one.last_name, username:dummyUsers.one.username, address:dummyUsers.one.address, phone_number:dummyUsers.one.phone_number, email:dummyUsers.one.email}).then(function(results){

      db.sequelize.query('select * from users where username=\'inormes\'').then(function(result){

        expect(result[0][0].username).to.equal(dummyUsers.one.username)
        done();
      })
    })


  });

  // it('Should output all messages from the DB', function(done) {
  //         done();

  // });
});
