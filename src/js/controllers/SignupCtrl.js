'use strict';
var app = angular.module('EmpApp')
  .controller('SignupCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.word = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;

    $scope.user = [];

    $scope.onSignup = function createUser() {
      $http({
        method: 'POST',
        url: 'http://localhost:3002/api/user/signup',
        data: {
          'name': $scope.userName,
          'email': $scope.userEmail,
          'password': $scope.userPassword
        },
        headers: { 'Content-Type': 'application/JSON' }
      }).then(
        newUser => {
          $scope.user.push(newUser);
          alert('User created!');
          document.forms["sign"].reset();
        })
        .catch(
          error => {
            alert(error.message);
          });
    };
  }]);  
