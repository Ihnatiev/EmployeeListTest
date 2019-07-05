var app = angular.module('EmpApp')
  .controller('EmployeeCtrl', ['$scope', '$http',
    function ($scope, $http) {
      //Get all employees
      $http({

        method: 'GET',
        url: 'http://localhost:3002/api/employees'

      }).then(function successCallback(response) {

        $scope.employees = response.data;

      }, function errorCallback(error) {

        alert("Error. Try Again!");

      });

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

    }])
  .directive('addEmployeeDialog', function () {

    return {
      restrict: 'E', // directive element
      scope: false,
      templateUrl: 'views/addEmployee.html',

      controller: function ($scope) {
        $scope.showPopUpDialog = false;
        $scope.closePopUpDialog = function () {
          $scope.showPopUpDialog = false;
        }
      }
    }
  });