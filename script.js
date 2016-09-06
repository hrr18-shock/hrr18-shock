angular.module('PTapp', [
  'ui.router'
  ])
  .config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/home");

  $stateProvider
    .state('home', {
      url: "/home",
      templateUrl: "" // Need to decide on a home page
    })
    .state('signin', {
      url: "/signin",
      templateUrl: "./signin.html"
    })
    .state('signup',{
      url: "/signup",
      templateUrl: "./signup.html"
    });
  });