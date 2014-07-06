angular.module('upload.ctrl', [])


  .controller('UploadCtrl', function ($scope, $rootScope, $upload, $state, Apps, Upload) {

    $scope.app = Upload;
    $scope.errorMessage = '';

    $scope.invalidForm = function (app) {

      if (parseInt(app.version) >= parseInt(app.version_nuevo)) {
        console.log(app.version_nuevo);

        $scope.errorMessage = "Must be higher than current version " + parseInt(app.version) + " new: " + parseInt(app.version_nuevo)
      }


      if (app.version_nuevo != null && app.version_nuevo != '') {
        return false;
      }
      return true;
    };

    $scope.plistSelect = function ($file) {
      console.log($file);
      for (var i = 0; i < $file.length; i++) {

        $scope.upload = $upload
          .upload({
            url: $rootScope.DB_URL + 'apps_amazonS3/upload/plist',
            method: 'POST',
            //headers: {'header-key': 'header-value'},
            data: {
              apps_SEQ: Upload.apps_SEQ,
              nombre: Upload.nombre,
              device: Upload.device,
              OS: Upload.OS,
              OS_version: Upload.OS_version,
              version_antigua: Upload.version_antigua,
              version: Upload.version,
              version_nuevo: Upload.version_nuevo
            },
            file: $file[i]
          })
          .progress(function (evt) {
            console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
          })
          .success(function (data, status, headers, config) {
            console.log(data, status);
          })
          .error(function (error) {
            console.log(error);
          });
      }
    };


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
      Upload.create(app.SEQ, app.nombre, app.device, app.OS, app.OS_version, app.version, app.version_antigua, null);
      $timeout(function () {
        $state.go('main.upload');
      }, 400);
    };
  });
