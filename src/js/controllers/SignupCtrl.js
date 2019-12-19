(function () {
  'use strict';

  angular.module('app')
    .controller('SignupCtrl', ['$scope', 'authService', SignupCtrl]);
  function SignupCtrl($scope, authService) {
    var vm = this;

    vm.signupSuccess = false;
    vm.signupError = false
    vm.signupErrorMessage = null;

    $scope.word = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;

    vm.signup = signup;

    function signup() {
      vm.signupSuccess = false;
      vm.signupError = false
      vm.signupErrorMessage = null;

      if (!vm.name ||!vm.email || !vm.password) {
        vm.signupError = true;
        vm.signupErrorMessage = 'Missing required fields';
        return;
      }

      authService.signup(vm.name, vm.email, vm.password)
        .then(handleSuccessfulSignup)
        .catch(handleFailedSignup);
    }

    function handleSuccessfulSignup(response) {
      vm.signupSuccess = true;
    }

    function handleFailedSignup(response) {
      vm.signupSuccess = false;

      if (response && response.data) {
        vm.signupErrorMessage = response.data.message;
        vm.signupError = true;
      }
    }
  }

})();
