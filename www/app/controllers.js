angular.module('AppStore.controllers', [])

  .controller('AppCtrl', function ($scope, $rootScope, $state, USER_ROLES, AuthService, Session) {

    $scope.currentUser = Session.usuario;
    $scope.userRoles = USER_ROLES;
    $scope.isAuthorized = AuthService.isAuthorized;

    $scope.usuario = Session.usuario;


    $scope.logOut = function () {
      $state.go('login.login');
    };

  });