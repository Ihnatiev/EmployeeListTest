(function () {
  'use strict';

  angular
    .module('app')
    .controller('NavController', [
      'authService',
      navController
    ]);

  function navController(authService) {
    var vm = this;

    vm.isAuthenticated = authService.getIsAuth();
    vm.logout = authService.logout;
  }

})();