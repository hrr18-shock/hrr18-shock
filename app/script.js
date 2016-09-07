angular.module('PTapp', [
  'ui.router'
  ])
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
      templateUrl: "./models/trainer.html"
    })
    .state('client', {
      url: "/client",
      templateUrl: "./models/client.html"
    });
  });