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
  var workOutID = 1;
  var oo = {
   workoutPlan: []
  }
  $http.get('/fetchWorkout/workoutlist/' + workOutID).success(function(data){
      angular.copy(data, oo.workoutPlan);
      console.log(data, oo.workoutPlan);
      $scope.linkS = oo.workoutPlan;
      console.log($scope.linkS, 'thisis the sssoso$$$');
    })

  }
]);