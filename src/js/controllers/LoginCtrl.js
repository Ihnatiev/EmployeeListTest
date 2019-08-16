'use strict';
var app = angular.module('EmpApp')
  .controller('LoginCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.word = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;

    $scope.onLogin = () => {
      $http({
        method: 'POST',
        url: 'http://localhost:3002/api/user/login',
        data: {
          'email': $scope.userEmail,
          'password': $scope.userPassword
        },
        headers: { 'Content-Type': 'application/JSON' }
      }).then(
        response => {
          console.log(response);
        })
        .catch(
          error => {
            console.log(error);
          });
    };
  }]);