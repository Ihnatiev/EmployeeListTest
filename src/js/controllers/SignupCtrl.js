'use strict';
var app = angular.module('EmpApp')
  .controller('SignupCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.word = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;
  }]);