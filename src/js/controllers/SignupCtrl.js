'use strict';

angular.module('app')
  .controller('SignupCtrl', ['$scope', '$http', '$log', '$location', function ($scope, $http, $log, $location) {
    $scope.word = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;

    $scope.onSignup = () => {
      $http({
        method: 'POST',
        url: 'http://localhost:3000/api/user/signup',
        data: {
          // 'name': $scope.userName,
          'email': $scope.userEmail,
          'password': $scope.userPassword
        },
        headers: { 'Content-Type': 'application/JSON' }
      }).then(
        newUser => {
          alert('User created!');
          document.forms["sign"].reset();
          $log.info(newUser);
        })
        .catch(
          error => {
            alert('This user exists');
            document.forms["sign"].reset();
            console.log(error);
          });
    };
  }]);  
