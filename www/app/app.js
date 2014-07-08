angular.module('AppStore', [
  // libraries
  'ionic',
  'http-auth-interceptor',
  'ngResource',
  'angularFileUpload',


  'login.ctrl',
  'apps.ctrl',
  'upload.ctrl',
  'profile.ctrl',


  'AppStore.controllers',
  'AppStore.services'
])

  .run(function ($rootScope, $state, $http, $ionicPlatform, AUTH_EVENTS, AuthService) {
    // globals
    $rootScope.DB_URL = 'http://www.desa-net.com/TOTAI/db/';
    $rootScope.totaiAppStore = 'http://desa-net.com/totaiAppStore/';
    $rootScope.appName = 'TotaiAppStore';

    $ionicPlatform.ready(function () {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });

    $rootScope.$on('$stateChangeStart', function (event, next) {
      var authorizedRoles = next.data.authorizedRoles;
      if (!AuthService.isAuthorized(authorizedRoles)) {
        //event.preventDefault();
        if (AuthService.isAuthenticated()) {
          $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
        } else {
          $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
        }
      }
    });

  })

  .constant('AUTH_EVENTS', {
    loginSuccess: 'auth-login-success',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success',
    sessionTimeout: 'auth-session-timeout',
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized'
  })

  .constant('USER_ROLES', {
    all: '*',
    admin: 'admin',
    editor: 'editor',
    guest: 'guest'
  })


  .config(function ($stateProvider, $urlRouterProvider, USER_ROLES) {
    $stateProvider


      // LOGIN

      .state('login', {
        abstract: true,
        template: "<ui-view/>"
      })

      .state('login.login', {
        url: "/login",
        templateUrl: "app/login/login.html",
        controller: 'LoginCtrl'
      })

      .state('login.contact', {
        url: "/contact",
        templateUrl: "app/login/contact.html",
        controller: 'ContactCtrl'
      })


      // MAIN

      .state('main', {
        url: "/main",
        abstract: true,
        templateUrl: "app/menu.html",
        controller: 'AppCtrl',
        data: {
          authorizedRoles: [USER_ROLES.all, USER_ROLES.editor, USER_ROLES.admin]
        }
      })


      .state('main.apps', {
        url: "/apps",
        views: {
          'menuContent': {
            templateUrl: "app/apps/apps.html",
            controller: 'AppsCtrl'
          }
        },
        data: {
          authorizedRoles: [USER_ROLES.all, USER_ROLES.editor, USER_ROLES.admin]
        }
      })

      .state('main.upload', {
        url: "/upload",
        views: {
          'menuContent': {
            templateUrl: "app/upload/upload.html",
            controller: 'UploadCtrl'
          }
        },
        data: {
          authorizedRoles: [USER_ROLES.editor]
        }
      })

      .state('main.upload-app', {
        url: "/upload/app",
        views: {
          'menuContent': {
            templateUrl: "app/upload/upload-app.html",
            controller: 'UploadAppCtrl'
          }
        },
        data: {
          authorizedRoles: [USER_ROLES.editor]
        }
      })

      .state('main.profile', {
        url: "/profile",
        views: {
          'menuContent': {
            templateUrl: "app/profile/profile.html",
            controller: 'ProfileCtrl'
          }
        },
        data: {
          authorizedRoles: [USER_ROLES.all, USER_ROLES.editor, USER_ROLES.admin]
        }
      });


    $urlRouterProvider.otherwise('/login');
  });

