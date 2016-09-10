var app = angular.module('trainerConnect', ['ngYoutubeEmbed']);

app.factory('clients', ['$http', function($http){
  var o = {
    clients: [],
    clientWorkouts: []
  };

  // going to need to add stuff to create workout in TrainerCtrl and add resolve to states

  o.getClients = function(trainerId){
    return $http.get('/clients/' + trainerId).success(function(data){
      angular.copy(data, o.clients);
      console.log(data)
    })
  }

  o.getWorkouts = function(trainerId, clientId){
    return $http.get('/clients/' + trainerId + '/' + clientId).success(function(data){
      angular.copy(data, o.clientWorkouts);
    })
  }

  o.addWorkout = function(trainerId, clientId, workout) {
    return $http.post('/clients/' + trainerId + '/workout', workout).success(function(data){
      o.clientWorkouts.push(data);
    });
  };

  return o;
}]);

app.factory('userRetriever', function(){
  return function($location, $http){
    FB.getLoginStatus(function(response) {
      console.log('You are', response.status);
      if(response.status !== 'connected'){
        $location.$$path = '/signin';
      } else {
        // MAKE REQUEST TO SERVER TO GET USER'S DATA
        FB.api('/me', function(response){
          $http({
            method: 'GET',
            url: '/fetch',
            data: response.id
          }).then(function(data) {
            // IF USER DOES NOT EXIST
            //if(!data.user){
              // REDIRECT TO SIGNUP PAGE
              //$location.$$path = '/signup';
            //} else {
              // PARSE THE DATA AND USE IT TO FILL OUT THE PAGE
              // $scope.workouts = data.user.workouts ?????????????
            //}
            //}, function(data) {
              //console.error(data);
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

    userRetriever($location, $http);

    // need to figure out how to get current trainer id
    var trainerId = 4;

    clients.getClients(trainerId);

    $scope.clients = clients.clients;

<<<<<<< c83f9d32771d317c3bcd86f3fb1a9d55e6db15c0
    // $scope.addClient = function(){
    //   if(!$scope.name || $scope.name === ''){
    //     return;
    //   }
      // $scope.clients.push({name: 'Foo Bar', workouts: []});
    //   $scope.name = '';
    // };
=======
    $scope.workouts = clients.clientWorkouts;
>>>>>>> Get clients and workouts working with dummy data

    $scope.retreiveWorkouts = function(){
      console.log("working!")
      clients.getWorkouts(trainerId, $scope.clientSelect.id)
      $state.go('trainer.workouts')
      // clients.getWorkouts(trainerId, $scope.client.name)
    }

    $scope.createWorkout = function(){
      // need to add in trainer and client id
      clients.addWorkout(trainerId, $scope.clientSelect.id, {e1: $scope.e1, d1: $scope.d1, e2: $scope.e2, d2: $scope.d2, e3: $scope.e3, d3: $scope.d3, e4: $scope.e4, d4: $scope.d4, e5: $scope.e5, d5: $scope.d5, e6: $scope.e6, d6: $scope.d6, e7: $scope.e7, d7: $scope.d7, e8: $scope.e8, d8: $scope.d8, e9: $scope.e9, d9: $scope.d9, e10: $scope.e10, d10: $scope.d10 });
      var index;
      $scope.clients.forEach(function(item, i){
        if(item.name === $scope.clientSelect.name){
          index = i;
        }
      });
      $scope.clients[index] = $scope.clientSelect;
      console.log($scope.clients[index])
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

  $scope.linkS = [];
  var a = {name: 'Squat', video: 'https://www.youtube.com/watch?v=Dy28eq2PjcM', description: '3x4'};
  var b = {description: '5x5', name: 'Deadlift', video: 'https://www.youtube.com/watch?v=-4qRntuXBSc'};
  $scope.linkS.push(a);
  $scope.linkS.push(b);
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

  var starWidth = $(window).width();

  if(starWidth <= 780){
    $('#leftContainer').attr('id','topContainer');
    $('#rightContainer').attr('id','bottomContainer');
  }

  }
]);