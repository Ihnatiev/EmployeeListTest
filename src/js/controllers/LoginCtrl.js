(function () {
  'use strict'

  angular
    .module('app')
    .controller('LoginCtrl', ['$state', 'authService', LoginCtrl]);
  function LoginCtrl($state, authService) {
    var vm = this;
    vm.LoginError = false
    vm.LoginErrorMessage = null;

    vm.login = login;

    function login() {
      vm.LoginError = false
      vm.LoginErrorMessage = null;

      if (!vm.email || !vm.password) {
        vm.LoginError = true;
        vm.LoginErrorMessage = 'Email and password required!';
        return;
      }
      

      authService.login(vm.email, vm.password)
        .then(handleSuccessfulLogin)
        .catch(handleFailedLogin);
    }

    function handleSuccessfulLogin() {
      $state.go('index');
    }

    function handleFailedLogin(response) {
      if (response && response.data) {
        vm.LoginErrorMessage = response.data.message;
        vm.LoginError = true;
      }
    }

  };
})();

