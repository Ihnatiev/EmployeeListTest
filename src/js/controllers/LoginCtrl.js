'use strict';
var app = angular.module('EmpApp')
  .controller('LoginCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.wordLog = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;
  }]);