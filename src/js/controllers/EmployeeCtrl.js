'use strict';
var app = angular.module('EmpApp')
  .controller('EmployeeCtrl', [
    '$scope', '$http',
    function ($scope, $http) {
      $http({

        method: 'GET',
        url: 'http://localhost:3002/api/employees'

      }).then(function successCallback(response) {

        $scope.employees = response.data;

      }, function errorCallback(error) {

        alert("Error. Try Again!");

      }
      );

      // $http({

      //   method: 'GET',
      //   url: 'http://localhost:3002/api/employees/' + employeeId

      // }).then(function successCallback(response) {

      //   $scope.employees = response.data;
      //   console.log(response);

      // }, function errorCallback(error) {

      //   alert("Error. Try Again!");

      // }
      // );

      //Delete employee
      $scope.deleteEmployee = function (employee) {
        $http({

          method: 'DELETE',
          url: 'http://localhost:3002/api/employees/' + employee.id,

        }).then(function successCallback(response) {

          var index = $scope.employees.indexOf(employee);
          $scope.employees.splice(index, 1);
          alert("Employee successfully deleted");

        }, function errorCallback(error) {

          alert("Error while deleting employee. Try Again!");

        });
      };

      $scope.addEmployee = function () {
        $scope.showPopUpDialog = true;
      }

      $scope.editEmployee = function () {
        $scope.showEmpEditDialog = true;
      }

      $scope.viewEmployee = function () {
        $scope.showEmpViewDialog = true;
      }

    }])
  .directive('popUpDialog', function () {
    return {
      restrict: 'E', // directive element
      scope: false,
      templateUrl: 'views/popUpDialog.html',
      controller: function ($scope) {
        $scope.showPopUpDialog = false;
        $scope.closePopUpDialog = function () {
          $scope.showPopUpDialog = false;
        }
      }
    }
  })
  .directive('empEditDialog', function () {
    return {
      restrict: 'E',
      scope: false,
      templateUrl: 'views/empEditDialog.html',
      controller: function ($scope) {
        $scope.showEmpEditDialog = false;
        $scope.closeEmpEditDialog = function () {
          $scope.showEmpEditDialog = false;
        }
      }
    }
  })
  .directive('empViewDialog', function () {
    return {
      restrict: 'E',
      scope: false,
      templateUrl: 'views/empViewDialog.html',
      controller: function ($scope) {
        $scope.showEmpViewDialog = false;
        $scope.closeEmpViewDialog = function () {
          $scope.showEmpViewDialog = false;
        }
      }
    }
  });