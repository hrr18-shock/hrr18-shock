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
    $scope.clientWorkOutList = [];
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
  $scope.clientIDHard = $scope.getMeDAID;
  FB.api('/me', function(response){ //Facebook request
          // QUERY OUR DATABASE TO SEE IF USER IS SIGNED UP
          $http({
            method: 'GET',
            url: '/fetchUser/' + response.name  // {name: Caleb Keith Aston, id: 4783264897238957298}
          }).then(function(user) {

              $scope.getMeDAID = user.data.id;
              console.log(user.data.id, 'im in clients');
              // QUERY OUR DATABASE TO SEE IF USER IS A TRAINER
              console.log($scope.getMeDAID, 'thisis the client ID');
              $scope.clientIDHard = $scope.getMeDAID;
              if($scope.clientIDHard !== undefined){

            $http.get('/fetchWorkoutLists/client/' + $scope.clientIDHard).success(function(data){
            angular.copy(data, $scope.clientWorkOutList);
            console.log($scope.clientWorkOutList);
            });

          }
            });
        })





  console.log($scope.clientIDHard, 'client id here');
  // $scope.clientWorkOutList = [];

  // if($scope.clientIDHard !== undefined){

  //   $http.get('/fetchWorkoutLists/client/' + $scope.clientIDHard).success(function(data){
  //   angular.copy(data, $scope.clientWorkOutList);
  //   console.log($scope.clientWorkOutList);
  // });

  // };


  // $http.get('/fetchWorkoutLists/client/' + $scope.clientIDHard).success(function(data){
  //   angular.copy(data, $scope.clientWorkOutList);
  //   console.log($scope.clientWorkOutList);
  // });


  $scope.workOutID = 0;

  $scope.$watch('workOutID', function(newValue, oldValue){

    if (!angular.equals(oldValue, newValue)) {

      console.log(newValue, "old", oldValue);
    $http.get('/fetchWorkout/workoutlist/' + $scope.workOutID).success(function(data){
      angular.copy(data, $scope.oo.workoutPlan);
      // console.log(data, $scope.oo.workoutPlan);
      $scope.linkS = $scope.oo.workoutPlan;
      // console.log($scope.linkS, 'thisis the sssoso$$$');
      console.log($scope.clientIDHard, 'client id here inside watch');
    })


    }
  }, true);

  $scope.oo = {
   workoutPlan: []
  }


  }
]);