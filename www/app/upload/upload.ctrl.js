angular.module('upload.ctrl', [])


  .controller('UploadCtrl', function ($scope, $state, Apps, Upload) {

    $scope.app = Upload;

    $scope.uploadPlist = function (app) {
      console.log(app);
    };

    $scope.uploadApp = function (app) {
      console.log(app);
    }

  })

  .controller('UploadAppCtrl', function ($scope, $state, $timeout, Apps, Upload) {

    Apps.getAll().$promise.then(function (d) {
      $scope.apps = d;
    });


    $scope.select = function (app) {
      Upload.create(app.nombre, app.device, app.OS, app.OS_version, app.version, app.version_antigua, null);
      $timeout(function () {
        $state.go('main.upload');
      }, 400);
    };
  });
