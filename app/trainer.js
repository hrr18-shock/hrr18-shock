var app = angular.module('trainerConnect', ['ngYoutubeEmbed']);

app.factory('clients', [function(){
  var o = {
    clients: []
  };
  return o;
}]);

app.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("clients");

  $stateProvider
    .state('clients', {
      templateUrl: './models/trainer-clients.html'
    })

}]);

app.controller('TrainerCtrl', [
  '$scope',
  'clients',
  function($scope, clients){
    $scope.clients = clients.clients;

    $scope.addClient = function(){
      if(!$scope.name || $scope.name === ''){
        return;
      }
      $scope.clients.push({name: $scope.name, workouts: []});
      $scope.name = '';
    };
    // video hardcoded
    $scope.linkS = ['https://www.youtube.com/watch?v=IODxDxX7oi4', 'https://www.youtube.com/watch?v=lQRsYgRafA8&feature=youtu.be', 'https://www.youtube.com/watch?v=Dy28eq2PjcM', 'https://www.youtube.com/watch?v=-4qRntuXBSc', 'https://www.youtube.com/watch?v=U4BS9EXvfyg&index=5&list=PL_UAXxDwtUkFzbr1npphK6WH4ytgJcQS8', 'https://www.youtube.com/watch?v=5a6bRnvjlgg&index=6&list=PL_UAXxDwtUkFzbr1npphK6WH4ytgJcQS8', 'https://www.youtube.com/watch?v=-phbNTs-SwU&index=7&list=PL_UAXxDwtUkFzbr1npphK6WH4ytgJcQS8'];
    $scope.link = 'https://www.youtube.com/watch?v=IODxDxX7oi4';

  }
]);