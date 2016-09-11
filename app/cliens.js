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
  // var a = {exercise_name: 'Squat', videoLink: 'https://www.youtube.com/watch?v=Dy28eq2PjcM', comments: '3x4'};
  // var b = {description: '5x5', name: 'Deadlift', video: 'https://www.youtube.com/watch?v=-4qRntuXBSc'};
  // {
  //   "id": 1,
  //   "workout_list_id": 1,
  //   "exercise_name": "push ups",
  //   "comments": "5 x 10",
  //   "videoLink": "https://www.youtube.com/watch?v=IODxDxX7oi4",
  //   "createdAt": "2016-09-11T00:18:33.740Z",
  //   "updatedAt": "2016-09-11T00:18:33.740Z"
  // }

  // $scope.linkS.push(a);
  // $scope.linkS.push(b);


  // $scope.linkS.push(b);
  $scope.clientIDHard = 4;
  $scope.clientWorkOutList = [];

  $http.get('/fetchWorkoutLists/client/' + $scope.clientIDHard).success(function(data){
    angular.copy(data, $scope.clientWorkOutList);
    console.log($scope.clientWorkOutList);
  });


  $scope.workOutID = 3;

  // watch is not fireing off when $scope.workOutID is changed
  $scope.$watch('workOutID', function(newValue, oldValue){

    if (!angular.equals(oldValue, newValue)) {

      console.log(newValue, "old", oldValue);
    $http.get('/fetchWorkout/workoutlist/' + $scope.workOutID).success(function(data){
      angular.copy(data, $scope.oo.workoutPlan);
      console.log(data, $scope.oo.workoutPlan);
      $scope.linkS = $scope.oo.workoutPlan;
      console.log($scope.linkS, 'thisis the sssoso$$$');
    })


    }
  }, true);

  $scope.oo = {
   workoutPlan: []
  }


  }
]);