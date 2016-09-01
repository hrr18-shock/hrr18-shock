angular.module('PTapp', [
  'ui.router'
  ])
  .config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/home");

  $stateProvider
    .state('home', {
      url: "/home",
      templateUrl: ""
    })
    .state('signin', {
      url: "/signin",
      templateUrl: ""
    })
    .state('signup',{
      url: "/signup",
      templateUrl: ""
    });