var app = angular.module('EmpApp', ['ui.bootstrap'])
  .controller('EmployeeCtrl', ['$scope', '$http', function ($scope, $http) {
    $http({

      method: 'GET',
      url: 'http://localhost:3002/api/employees'

    }).then(function successCallback(response) {

      console.log(response);
      $scope.employees = response.data;
      // $scope.currentPage = 1;
      // $scope.pageSize = 4;

    }, function errorCallback(error) {

      alert("Error. Try Again!");

    });
  }]);
