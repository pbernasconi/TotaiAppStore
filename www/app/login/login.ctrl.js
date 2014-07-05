angular.module('login.ctrl', [])

  .controller('LoginCtrl', function ($scope, $rootScope, $state, AUTH_EVENTS, AuthService) {

    $scope.loginMessage = '';

    $scope.user = {
      usuario: null,
      contrasena: null
    };

    $scope.login = function (user) {
      AuthService.login(user).then(function () {
        $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
        $state.go('main.apps');
      }, function () {
        $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
      });
    };

    $rootScope.$on('auth-not-authorized', function () {
      alert('not authorized');
      $scope.loginMessage = 'Not authorized';
    })
  })

  .controller('ContactCtrl', function ($scope, $state) {
  });
