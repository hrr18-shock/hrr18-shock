var models = require('../db/models.js');
// client to database methods
module.exports = {
  trainersView:{

    addClient: function(){

    },
    searchClients: function(){

    },
    createWorkouts: function(){

    }

  },
  clientsView:{
    grabWorkouts: function(){

    }
  },
  usersView:{
    // params is an object that contains the properties of the user
    // models.Users.create({first_name:params.firstName, last_name:params.lastName, username:params.username, address:params.address, phone_number:params.phoneNumber, email:params.email})
    signUp: function(params){
      models.Users.findOrCreate({where:{username:params.username}, defaults: {
          first_name: params.firstName, last_name:params.lastName, address:params.address, phone_number:params.phoneNumber, email:params.email
        }
      }).then(function(results){
        console.log(results)
      });
    },
    login: function(){

    }
  }


}



//testing grounds ignore past this point
// working method
// personParams = {firstName:'kale', lastName:'evad', username:'kaleevad', address:'9521 hello world', phoneNumber:'110399123', email:'kaleevad@gmail.com'}
// module.exports.usersView.signUp(personParams)

// // this query creates a user
// models.Users.create({first_name:'david1', last_name:'dave1', username:'helloworld', address:'1234 hello world', phone_number:3214443333, email:'helloworld@gmail.com'})
// models.Users.create({first_name:'inor', last_name:'mes', username:'inormes', address:'1234 inormes', phone_number:'13546665', email:'inormes@gmail.com'})
// this query sets the user as a trainer
// models.Trainers.create({id_user:1})

// this creates the trainer client relationship
// for some reason the forerign key gets changed to userId and trainer Id
// models.Trainer_Client.create({userId:2, trainerId:2})
















