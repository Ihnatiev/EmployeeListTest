'use strict';

angular.module('app')
  .controller('SignupCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {
    $scope.word = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;
    
    $scope.onSignup = () => {
      $http({
        method: 'POST',
        url: 'https://localhost:6969/api/auth/signup',
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
        $location.path('/user/login');
      }, function (error) {
        alert(error.data.message);
      });
    };
  }]);  
