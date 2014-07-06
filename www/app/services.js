angular.module('AppStore.services', [])


  .factory('Apps', function ($rootScope, $resource) {
    return $resource('http://www.desa-net.com/TOTAI/db/apps/:SEQ:verb', {}, {
        getAll: {method: 'GET', isArray: true},
        getOne: {method: 'GET', params: {SEQ: '@SEQ'}},
        getIcon: {method: 'GET', params: {verb: 'getIcon', version: '@version', apps_SEQ: '@apps_SEQ'}, isArray: false},
        findByName: {method: 'GET', params: {query: '@query'}, isArray: true},
        update: {method: 'POST', params: {SEQ: '@SEQ'}},
        new: {method: 'POST'},
        delete: {method: 'DELETE', params: {SEQ: '@SEQ'}}
      }
    );
  })

  .factory('AppsAmazonS3', function ($rootScope, $resource) {
    return $resource('http://www.desa-net.com/TOTAI/db/apps_amazonS3/:SEQ:verb', {}, {
        getAll: {method: 'GET', isArray: true},
        getOne: {method: 'GET', params: {SEQ: '@SEQ'}},
        getWithVersion: {method: 'GET', params: {verb: 'get', version: '@version', apps_SEQ: '@apps_SEQ'}, isArray: true},
        findByName: {method: 'GET', params: {query: '@query'}, isArray: true},
        update: {method: 'POST', params: {SEQ: '@SEQ'}},
        new: {method: 'POST'},
        delete: {method: 'DELETE', params: {SEQ: '@SEQ'}}
      }
    );
  })


  .factory('Upload', function ($rootScope, $http) {

    this.create = function (apps_SEQ, nombre, device, OS, OS_version, version, version_antigua, version_nuevo) {
      this.apps_SEQ = apps_SEQ;
      this.nombre = nombre;
      this.device = device;
      this.OS = OS;
      this.OS_version = OS_version;
      this.version_antigua = version_antigua;
      this.version = version;
      this.version_nuevo = version_nuevo;
    };
    this.destroy = function () {
      this.apps_SEQ = null;
      this.nombre = null;
      this.device = null;
      this.OS = null;
      this.OS_version = null;
      this.version_antigua = null;
      this.version = null;
    };
    return this;
  })

  .factory('AuthService', function ($rootScope, $http, Session) {
    return {
      login: function (user) {
        return $http
          .post($rootScope.DB_URL + 'persona/login', user)
          .then(function (res) {

            console.log(res.data);
            Session.create(user.usuario, 'admin');
          });
      },
      isAuthenticated: function () {
        return !!Session.usuario;
      },
      isAuthorized: function (authorizedRoles) {
        if (!angular.isArray(authorizedRoles)) {
          authorizedRoles = [authorizedRoles];
        }
        return (this.isAuthenticated() &&
          authorizedRoles.indexOf(Session.nivel) !== -1);
      }
    };
  })


  .service('Session', function () {
    this.create = function (userId, nivel) {
      this.usuario = userId;
      this.nivel = nivel;
    };
    this.destroy = function () {
      this.usuario = null;
      this.nivel = null;
    };
    return this;
  });