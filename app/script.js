angular.module('PTapp', [
  'ui.router',
  'trainerConnect'
  ])

  .controller('signupController', function($scope, $http, signupFactory){

    $scope.signup = function(){
      signupFactory($scope.role);
    }
  })

  .factory('signupFactory', function(){
    return function(userRole, userID, userName){
      console.log(userRole, userID, userName);
      // $http({
      //   method: 'POST',
      //   url: '/create',
      //   data: {userType: userType,
      //          userID:   userID,
      //          userName: userName
      //   }
      // }).then(function(data){
      //   console.log('Your user was added', data);
      // }, function(data){
      //   console.error(data);
      // })
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
      controller: 'TrainerCtrl',
      templateUrl: "./models/client.html"
    })
  });