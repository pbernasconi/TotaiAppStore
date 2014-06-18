angular.module('starter', [
  'ionic',
  'starter.controllers',
  'starter.services'
])

  .run(function ($rootScope, $ionicPlatform) {
    $ionicPlatform.ready(function () {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });

  })


  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider


      .state('login', {
        url: "/login",
        templateUrl: "templates/login.html",
        controller: 'LoginCtrl'
      })

      .state('app', {
        url: "/app",
        abstract: true,
        templateUrl: "templates/menu.html",
        controller: 'AppCtrl'
      })


      .state('app.apps', {
        url: "/apps",
        views: {
          'menuContent': {
            templateUrl: "templates/apps.html"
          }
        }
      })

      .state('app.search', {
        url: "/search",
        views: {
          'menuContent': {
            templateUrl: "templates/search.html"
          }
        }
      })

      .state('app.browse', {
        url: "/browse",
        views: {
          'menuContent': {
            templateUrl: "templates/browse.html"
          }
        }
      })
      .state('app.playlists', {
        url: "/playlists",
        views: {
          'menuContent': {
            templateUrl: "templates/playlists.html",
            controller: 'PlaylistsCtrl'
          }
        }
      })

      .state('app.single', {
        url: "/playlists/:playlistId",
        views: {
          'menuContent': {
            templateUrl: "templates/playlist.html",
            controller: 'PlaylistCtrl'
          }
        }
      });

    $urlRouterProvider.otherwise('login');
  });

