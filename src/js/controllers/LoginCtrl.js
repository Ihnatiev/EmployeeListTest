'use strict'

angular.module('app')
.controller('LoginCtrl', ['authService', '$scope', '$location', function (authService, $scope, $location) {
  $scope.signin = () => {
    $scope.credentials = {
      email: $scope.email,
      password: $scope.password
    }
    authService.loginUser($scope.credentials);
    $location.path('/employees');
  }
  
}]);


