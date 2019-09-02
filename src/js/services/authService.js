(function () {
  'use strict';

  angular.module('app')
    .service('AuthService', AuthService);

  AuthService.$inject = ['Session', '$log'];

  function AuthService(Session, $log) {

    var service = {
      isLoggedIn: isLoggedIn,
      logout: logout,
      getToken: getToken,
      setUser: setUser
    };

    return service;

    function isLoggedIn() {

      if (Session.get('tokenId')) {
        return true
      }
      else {
        return false
      }
    }

    function logout() {

      Session.delete('tokenId');
    }

    function getToken() {
      return Session.get('tokenId');
    }

    function setUser(data) {
      Session.put('tokenId', data.token);
      // Session.put('email', data.user.email);

    }
  }
})(window, window.angular);