(function () {
  'use strict';
  angular.module('app')
    .factory('authService', ['$http', '$state', '$window', authService]);

  function authService($http, $state, $window) {
    var path = 'https://localhost:6969/api/auth';
    var isAuthenticated = false;
    var vm = this;
    var authService = {
      login: login,
      logout: logout,
      signup: signup,
      getToken: getToken,
      getIsAuth: getIsAuth,
      isAuthenticated: isAuthenticated,
      autoAuthUser: autoAuthUser,
      getAuthData: getAuthData,
      clearAuthData: clearAuthData
    };

    return authService;
    function login(email, password) {
      var reqObj = {
        method: 'POST',
        url: path + '/login',
        data: {
          email: email,
          password: password
        }
      }
      return $http(reqObj).then(function (response, error) {
        var token = response.data.token;
        if (token) {
          vm.isAuthenticated = true;
          var expiresInDuration = response.data.expiresIn;
          var now = new Date();
          var expirationDate = new Date(
            now.getTime() + expiresInDuration * 1000
          );
          var userId = response.data.userId;
          var userName = response.data.userName;
          $window.localStorage.setItem('token', 'Basic ' + token);
          $window.localStorage.setItem('userId', userId);
          $window.localStorage.setItem('userName', userName);
          $window.localStorage.setItem('expiration', expirationDate.toISOString());
        } else {
          console.log(error.data.message);
        };
      });
    };

    function signup(name, email, password) {
      var reqObj = {
        method: 'POST',
        url: path + '/signup',
        data: {
          name: name,
          email: email,
          password: password
        }
      }

      return $http(reqObj);
    };

    function logout() {
      vm.token = '';
      vm.userId = '';
      vm.userName = '';
      vm.isAuthenticated = false;
      clearTimeout(this.tokenTimer);
      clearAuthData();
      $state.go('index');
    };

    function getToken() {
      return getAuthData().token;
    };

    function getIsAuth() {
      if ($window.localStorage.getItem('expiration')!== null) {
      return true;
      } else {
        return false;
      }
    };

    function isAuthenticated() {
      return vm.isAuthenticated;
    }

    function getAuthData() {
      const token = $window.localStorage.getItem('Basic ' + 'token');
      const expirationDate = $window.localStorage.getItem('expiration');
      if (!token || !expirationDate) {
        return;
      }
      const userId = $window.localStorage.getItem('userId');
      const userName = $window.localStorage.getItem('userName');
      return {
        token,
        expirationDate: new Date(expirationDate),
        userId,
        userName
      }
    };

    function autoAuthUser() {
      const authInformation = getAuthData();
      if (!authInformation) {
        return;
      }
      const now = new Date();
      const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
      if (expiresIn > 0) {
        vm.token = authInformation.token;
        vm.isAuthenticated = true;
        vm.userId = stringify(authInformation.userId);
        vm.userName = stringify(authInformation.userName);
      }
    };

    function clearAuthData() {
      $window.localStorage.removeItem('token');
      $window.localStorage.removeItem('expiration');
      $window.localStorage.removeItem('userId');
      $window.localStorage.removeItem('userName');
    }
  };
})();




  //     getUserId: function () {
  //       return $window.localStorage.getItem('userId', userId);;
  //     },

  //     getUserName: function () {
  //       return userName;
  //     },




  //     setAuthTimer: function (duration) {
  //       tokenTimer = setTimeout(() => {
  //         this.logout();
  //       }, duration * 1000);
  //     },



