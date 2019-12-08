'use strict';

angular.module('app')
  .controller('SignupCtrl', ['$scope', '$http', '$log', '$location', function ($scope, $http, $log, $location) {
    $scope.word = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;
    
    $scope.onSignup = () => {
      $http({
        method: 'POST',
        url: 'https://localhost:3002/api/auth/signup',
        data: {
          name: $scope.name,
          email: $scope.email,
          password: $scope.password
        },
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(function (result) {
        alert(result.data.message);
      }, function (error) {
        alert(error.data.message);
      });
    };
  }]);  
