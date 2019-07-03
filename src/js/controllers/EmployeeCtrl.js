var app = angular.module('EmpApp')
  .controller('EmployeeCtrl', [
    '$scope', '$http',
    function ($scope, $http) {
      $http({

        method: 'GET',
        url: '/api/employees'

      }).then(function successCallback(response) {

        console.log(response);
        $scope.employees = response.data;

      }, function errorCallback(error) {

        alert("Error. Try Again!");

      });
    }]);
