angular.module('PTapp', [
  'ui.router',
  'trainerConnect'
  ])

  .controller('authController', function($scope){

  })

  .config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/home");

  $stateProvider
    .state('home', {
      url: "/home",
      templateUrl: "./models/home.html" // Need to decide on a home page
    })
    .state('signin', {
      url: "/signin",
      templateUrl: "./models/signin.html"
    })
    .state('signup', {
      url: "/signup",
      templateUrl: "./models/signup.html"
    })
    .state('trainer', {
      url: "/trainer",
      controller: 'TrainerCtrl',
      templateUrl: "./models/trainer.html"
    })
    .state('client', {
      url: "/client",
      controller: 'TrainerCtrl',
      templateUrl: "./models/client.html"
    });
  });