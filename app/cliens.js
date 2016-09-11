var myApp = angular.module('cliensConnect', ['ngYoutubeEmbed']);

app.controller('CliensCtrl', [
  '$scope',
  'clients',
  '$location',
  '$http',
  'userRetriever',
  '$state',
  function($scope, clients, $location, $http, userRetriever, $state){

    $scope.linkS = [];
  var a = {name: 'Squat', video: 'https://www.youtube.com/watch?v=Dy28eq2PjcM', description: '3x4'};
  var b = {description: '5x5', name: 'Deadlift', video: 'https://www.youtube.com/watch?v=-4qRntuXBSc'};
  $scope.linkS.push(a);
  $scope.linkS.push(b);

  }
]);