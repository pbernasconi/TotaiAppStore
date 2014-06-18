angular.module('starter.controllers', [])

  .controller('AppCtrl', function ($scope, $state) {

    $scope.logOut = function () {
      $state.go('login');
    }
  })

  .controller('LoginCtrl', function ($scope, $state) {

    $scope.credentials = {
      username: '',
      password: ''
    };

    $scope.login = function(credentials) {
      if (credentials.username == 'paolo' && credentials.password == 'pass') {
        $state.go('app.apps');
      }
      else {
        alert('Wrong username and password');
      }
    }
  })

  .controller('PlaylistsCtrl', function ($scope) {
    $scope.playlists = [
      { title: 'Reggae', id: 1 },
      { title: 'Chill', id: 2 },
      { title: 'Dubstep', id: 3 },
      { title: 'Indie', id: 4 },
      { title: 'Rap', id: 5 },
      { title: 'Cowbell', id: 6 }
    ];
  })

  .controller('PlaylistCtrl', function ($scope, $stateParams) {
  });
