var app = angular.module('trainerConnect', ['ngYoutubeEmbed']);

app.factory('clients', ['$http', function($http){
  var o = {
    clients: [],
    clientWorkouts: [],
    workout: []
  };

  // going to need to add stuff to create workout in TrainerCtrl and add resolve to states

  o.getClients = function(trainerId){
    return $http.get('/trainer/' + trainerId + '/grabClients').success(function(data){
      if(data.length){
        angular.copy(data[0].users, o.clients);
      }
    })
  }

  o.getWorkouts = function(trainerId, clientId){
    return $http.get('/fetchWorkoutLists/client/' + clientId).success(function(data){
      angular.copy(data, o.clientWorkouts);
    })
  }

  o.getWorkout = function(workoutId){
    return $http.get('/fetchWorkout/workoutlist/' + workoutId).success(function(data){
      angular.copy(data, o.workout);
    })
  }

  o.addWorkout = function(trainerId, clientId, workout) {
    return $http.post('/trainer/createWorkouts', workout).success(function(data){
      console.log('this is the data: ', data)
      o.clientWorkouts.push(data);
    });
  };

  return o;
}]);

app.factory('userRetriever', function(){
  return function($location, $http, $state, $scope, clients){
    console.log('$LOCATION*****************',$location.$$path);
    FB.getLoginStatus(function(response) {
      //console.log('You are', response.status);
      if(response.status !== 'connected'){
        $state.go('home');
      } else {
        // MAKE REQUEST TO SERVER TO GET USER'S DATA
        FB.api('/me', function(response){ //Facebook request
          // QUERY OUR DATABASE TO SEE IF USER IS SIGNED UP
          $http({
            method: 'GET',
            url: '/fetchUser/' + response.name  // {name: Caleb Keith Aston, id: 4783264897238957298}
          }).then(function(user) {
            //console.log('user', user);
            if(user.data === 'invalid user') {
              $state.go('signup');
            } else {
              // set a global userId to get workouts for user
              console.log(user.data.id, 'im in FB function');
              // QUERY OUR DATABASE TO SEE IF USER IS A TRAINER
              $scope.userId = user.data.id;
              $http({
                method: 'GET',
                url: '/isTrainer/' + user.data.id
              }).then(function(isTrainer){
                console.log('isTrainer', isTrainer);
                if(isTrainer.data === ''){
                  $state.go('client');
                } else {
                  $state.go('trainer.client');
                  clients.getClients(isTrainer.data.id);
                }
              })
            }
            });
        })

        }
      });
  }
})

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
  '$location',
  '$http',
  'userRetriever',
  '$state',
  function($scope, clients, $location, $http, userRetriever, $state){

    userRetriever($location, $http, $state, $scope, clients);

    // don't know if this is correct way to get trainer id
    // FB.api('/me', function(res){return res.id });
    // call to grab trainer id
    var trainerId = $scope.userId;

    // clients.getClients(trainerId);

    $scope.clients = clients.clients;

    $scope.workouts = clients.clientWorkouts;

    $scope.workout = clients.workout;

    $scope.retreiveWorkout = function(){
      clients.getWorkout($scope.workoutSelect.id)
    }

    $scope.retreiveWorkouts = function(){
      clients.getWorkouts(trainerId, $scope.clientSelect.id)
      $state.go('trainer.workouts')
    }

    $scope.createWorkout = function(){
      clients.addWorkout(trainerId, $scope.clientSelect.id,
      {
        workoutList: {
          comments: $scope.title,
          user_id: $scope.clientSelect.id,
          trainer_id: trainerId
        },
        workouts: [
          {
            exercise_name: $scope.e1,
            comments: $scope.d1,
            videoLink: $scope.v1
          },
          {
            exercise_name: $scope.e2,
            comments: $scope.d2,
            videoLink: $scope.v2
          },
          {
            exercise_name: $scope.e3,
            comments: $scope.d3,
            videoLink: $scope.v3,
          },
          {
            exercise_name: $scope.e4,
            comments: $scope.d4,
            videoLink: $scope.v4
          },
          {
            exercise_name: $scope.e5,
            comments: $scope.d5,
            videoLink: $scope.v5
          },
          {
            exercise_name: $scope.e6,
            comments: $scope.d6,
            videoLink: $scope.v6
          },
          {
            exercise_name: $scope.e7,
            comments: $scope.d7,
            videoLink: $scope.v7
          },
          {
            exercise_name: $scope.e8,
            comments: $scope.d8,
            videoLink: $scope.v8
          },
          {
            exercise_name: $scope.e9,
            comments: $scope.d9,
            videoLink: $scope.v9
          },
          {
            exercise_name: $scope.e10,
            comments: $scope.d10,
            videoLink: $scope.v10
          }
        ]
      });

      var index;
      $scope.clients.forEach(function(item, i){
        if(item.name === $scope.clientSelect.name){
          index = i;
        }
      });
      $scope.clients[index] = $scope.clientSelect;
      console.log($scope.clients[index])
      $scope.title = '';
      $scope.clientSelect = '';
      $scope.e1 = '';
      $scope.d1 = '';
      $scope.e2 = '';
      $scope.d2 = '';
      $scope.e3 = '';
      $scope.d3 = '';
      $scope.e4 = '';
      $scope.d4 = '';
      $scope.e5 = '';
      $scope.d5 = '';
      $scope.e6 = '';
      $scope.d6 = '';
      $scope.e7 = '';
      $scope.d7 = '';
      $scope.e8 = '';
      $scope.d8 = '';
      $scope.e9 = '';
      $scope.d9 = '';
      $scope.e10 = '';
      $scope.d10 = '';
      $scope.v1 = '';
      $scope.v2 = '';
      $scope.v3 = '';
      $scope.v4 = '';
      $scope.v5 = '';
      $scope.v6 = '';
      $scope.v7 = '';
      $scope.v8 = '';
      $scope.v9 = '';
      $scope.v10 = '';
    };

    // excercise names hardcoded for testing
    // make sure id = id in the database!!!
    $scope.exNames = {
    model: null,
    availableOptions: [
      {id: '1', name: 'Squat', video: 'https://www.youtube.com/watch?v=Dy28eq2PjcM'},
      {id: '2', name: 'Deadlift', video: 'https://www.youtube.com/watch?v=-4qRntuXBSc'},
      {id: '3', name: 'Bench press', video: 'https://www.youtube.com/watch?v=U4BS9EXvfyg'},
      {id: '4', name: 'Push-up', video: 'https://www.youtube.com/watch?v=IODxDxX7oi4'},
      {id: '5', name: 'Overhead press', video: 'https://www.youtube.com/watch?v=F3QY5vMz_6I'},
      {id: '6', name: 'Dips', video: 'https://www.youtube.com/watch?v=lZuogVd98oA'}
    ]
   };


   // example of a workout data
   var exampleWorkoutData = {
      d1: "2x3",
      d2: "5x5",
      d3: "20",
      d4: undefined,
      d5: undefined,
      d6: undefined,
      d7: undefined,
      d8: undefined,
      d9: undefined,
      d10: undefined,
      e1: "1",
      e2: "2",
      e3: "4",
      e4: undefined,
      e5: undefined,
      e6: undefined,
      e7: undefined,
      e8: undefined,
      e9: undefined,
      e10: undefined
   };

  // $scope.linkS = [];
  // var a = {name: 'Squat', video: 'https://www.youtube.com/watch?v=Dy28eq2PjcM', description: '3x4'};
  // var b = {description: '5x5', name: 'Deadlift', video: 'https://www.youtube.com/watch?v=-4qRntuXBSc'};
  // $scope.linkS.push(a);
  // $scope.linkS.push(b);
  //   // video hardcoded
  //   $scope.linkS = [{video: 'https://www.youtube.com/watch?v=IODxDxX7oi4',
  // description: 'do this a lot'},
  // {video: 'https://www.youtube.com/watch?v=lQRsYgRafA8&feature=youtu.be',
  // description: 'this helps too'},
  // {video: 'https://www.youtube.com/watch?v=Dy28eq2PjcM',
  // description: 'ex2'},
  // 'https://www.youtube.com/watch?v=-4qRntuXBSc',
  // 'https://www.youtube.com/watch?v=U4BS9EXvfyg&index=5&list=PL_UAXxDwtUkFzbr1npphK6WH4ytgJcQS8',
  // 'https://www.youtube.com/watch?v=5a6bRnvjlgg&index=6&list=PL_UAXxDwtUkFzbr1npphK6WH4ytgJcQS8',
  // 'https://www.youtube.com/watch?v=-phbNTs-SwU&index=7&list=PL_UAXxDwtUkFzbr1npphK6WH4ytgJcQS8'];

  $scope.getMeDAID = (function(){
    var fooBar = $scope.userId;
    console.log('serving up user id', fooBar);
    return fooBar;
  })();

  console.log($scope.userId, 'arg')

  var starWidth = $(window).width();

  if(starWidth <= 780){
    $('#leftContainer').attr('id','topContainer');
    $('#rightContainer').attr('id','bottomContainer');
  }

  }
]);