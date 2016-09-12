angular.module('PTapp', [
  'ui.router',
  'trainerConnect',
  'cliensConnect'
  ])

  .controller('signupController', function($scope, $http, signupFactory){
    // grab trainers usernames in an array
    $scope.trainers = $http({
        method: 'GET',
        url: '/displayTrainers'
    }).then(function(data){
      console.log(data.data.map(function(trainers){ return { trainer_id:trainers.id ,name:trainers.username}}))
      $scope.trainers = data.data.map(function(trainers){ return { trainer_id:trainers.id ,name:trainers.username}})
    })

    $scope.signup = function(){
      console.log($scope)
      FB.api('/me', function(response){
        var trainerSelected = $scope.selectedTrainer ? $scope.selectedTrainer.trainer_id : ''
        signupFactory($http, $scope.role, response.id, response.name, trainerSelected);
      })
    }
  })

  .factory('signupFactory', function(){
    return function($http, userRole, fbID, userName, trainer){
      //console.log(userRole, fbID, userName, trainer);
        $http({
          method: 'GET',
          url: '/fetchUser/' + userName  // {name: Caleb Keith Aston, id: 4783264897238957298}
        }).then(function(data) { //Database request
          //console.log(data);
          if(data.data === 'invalid user') {
            console.log('Creating new user');
            $http({
              method: 'POST',
              url: '/signUp',
              data: {
                     userRole: userRole,
                     fbID:   fbID,
                     userName: userName,
                     trainer_id:  trainer || ''
              }
            }).then(function(data){
              //console.log('Your user was added', data);
            }, function(data){
              console.error(data);
            })
          } else {
            console.log('**** User already exists ****')
          }
          });
    };
  })

  .config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/home");

  $stateProvider
    .state('home', {
      url: "/home",
      templateUrl: "./models/home.html"
    })
    .state('loading', {
      url: "/loading",
      controller: 'TrainerCtrl',
      templateUrl: "./models/loading.html"
    })
    .state('signup', {
      url: "/signup",
      controller: 'signupController',
      templateUrl: "./models/signup.html"
    })
    .state('trainer', {
      url: "/trainer",
      controller: 'TrainerCtrl',
      templateUrl: "./models/trainer.html"
    })
    .state('trainer.client', {
      url: '/trainer-client',
      templateUrl: './models/trainer-clients.html',
      controller: 'TrainerCtrl'
    })
    .state('trainer.workouts', {
      url: '/trainer-workouts/{id}',
      templateUrl: './models/trainer-workouts.html',
      controller: 'TrainerCtrl'
    })
    .state('client', {
      url: "/client",
      controller: 'CliensCtrl',
      templateUrl: "./models/client.html"
    })
  });