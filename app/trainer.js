var app = angular.module('trainerConnect', []);

app.factory('clients', [function(){
  var o = {
    clients: []
  };
  return o;
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
  }
]);