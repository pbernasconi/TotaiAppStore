angular.module('AppStore.controllers', [])

  .controller('AppCtrl', function ($scope, $rootScope, $state, USER_ROLES, AuthService) {

    $scope.currentUser = null;
    $scope.userRoles = USER_ROLES;
    $scope.isAuthorized = AuthService.isAuthorized;


    $scope.logOut = function () {
      $state.go('login.login');
    };

  });