angular.module('PTapp', [
  'ui.router',
  'trainerConnect',
  'cliensConnect'
  ])

  .controller('signupController', function($scope, $http, signupFactory){

    $scope.trainers = ['Bob', 'Jim', 'Wes'];

    $scope.signup = function(){
      FB.api('/me', function(response){
        signupFactory($http, $scope.role, response.id, response.name, $scope.trainer);
      })
    }
  })

  .factory('signupFactory', function(){
    return function($http, userRole, userID, userName, trainer){
      console.log(userRole, userID, userName, trainer);
      $http({
        method: 'POST',
        url: '/create',
        data: {userType: userRole,
               userID:   userID,
               userName: userName,
               trainer:  trainer
        }
      }).then(function(data){
        console.log('Your user was added', data);
      }, function(data){
        console.error(data);
      })
    }
  })

  .config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/home");

  $stateProvider
    .state('home', {
      url: "/home",
      templateUrl: "./models/home.html"
    })
    .state('signin', {
      url: "/signin",
      templateUrl: "./models/signin.html"
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