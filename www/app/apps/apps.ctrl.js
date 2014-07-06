angular.module('apps.ctrl', [])


  .controller('AppsCtrl', function ($scope, $state, $rootScope, $timeout, Apps, AppsAmazonS3) {

    Apps.getAll().$promise.then(function (data) {
      $scope.apps = data;


      angular.forEach(data, function (each) {

        $timeout(function () {
          each.icon = $rootScope.DB_URL + 'apps/get?SEQ=' + each.SEQ +'&version=' + each.version;
        })


        AppsAmazonS3.getWithVersion({version: each.version, apps_SEQ: each.SEQ}).$promise.then(function (d) {
          each.url = d[0].url;
        });
      })
    });

  });
