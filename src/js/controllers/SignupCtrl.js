'use strict';

angular.module('app')
  .controller('SignupCtrl', ['$scope', '$http', '$log', '$location', function ($scope, $http, $log, $location) {
    $scope.word = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;

    $scope.pass = btoa($scope.password);

    $scope.onSignup = () => {
      $http.post('http://localhost:3000/api/user/signup', {
        email: $scope.email,
        password: $scope.pass
      }).then(res => {
        alert(res.data.message);
        document.forms["sign"].reset();
      }).catch(error => {
        alert(error.data.message);
        document.forms["sign"].reset();
        console.log(error);
      });
    };
  }]);  
