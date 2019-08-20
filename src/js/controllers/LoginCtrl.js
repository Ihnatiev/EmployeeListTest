'use strict';
var app = angular.module('EmpApp')
  .controller('LoginCtrl', ['$scope', '$http', '$log', function ($scope, $http, $log) {
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
          document.forms["login"].reset();
          $log.info(response);
        })
        .catch(
          error => {
            alert(error);
            document.forms["login"].reset();
            $log.info(error);
          });
    };
  }]);