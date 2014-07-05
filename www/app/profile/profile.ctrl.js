angular.module('profile.ctrl', [])

  .controller('ProfileCtrl', function ($scope, $state, Session) {

    $scope.usuario = Session.usuario;

    $scope.apps = ['Trucking', 'Campo', 'Otra'];
  });
