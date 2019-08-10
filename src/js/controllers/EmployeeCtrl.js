'use strict';

var app = angular.module('EmpApp')
  .controller('EmployeeCtrl', ['$scope', '$http', function ($scope, $http) {

    $scope.dpName = {
      model: null,
      availableDepartments: [
        {id: '1', name: 'HR'},
        {id: '2', name: 'Tech'},
        {id: '3', name: 'Finance'}
      ]
    };

    $scope.empActive = {
      model: false
    };

    $scope.getAllEmployees = function () {
      $http({
        method: 'GET',
        url: 'http://localhost:3002/api/employees'
      }).then(function successCallback(response) {
        $scope.employees = response.data;
      }, function errorCallback() {
        alert("Error. Try Again!");
      }
      );
    };

    $scope.getEmployeeById = function (employeeId) {
      $scope.showEmpViewDialog = true;
      $http({
        method: 'GET',
        url: 'http://localhost:3002/api/employees/' + employeeId
      }).then(function successCallback(response) {
        $scope.readAnEmployee = response.data;
      }, function errorCallback() {
        alert("Error. Try Again!");
      }
      );
    };

    $scope.createEmployee = function () {
      $http({
        method: 'POST',
        url: 'http://localhost:3002/api/employees',
        data: {
          'empName': $scope.empName,
          'empActive': $scope.empActive.model,
          'empDepartment': $scope.dpName.model
        }
      }).then(function successCallback(data) {
        $scope.employees.push(data);
        alert("Employee added successfully");
        $scope.closeEmpAddDialog();
        $scope.getAllEmployees();
      }, function errorCallback() {
        alert("Error. Try Again!");
      });
    };

    $scope.editEmployee = function (employeeId) {
      $http({
        method: 'PUT',
        url: 'http://localhost:3002/api/employees/' + employeeId,
        data: {
          'empName': $scope.empName,
          'empActive': $scope.empActive.model,
          'empDepartment': $scope.dpName.model
        }
      }).then(function successCallback(data) {
        $scope.employees.push(data);
        alert("Employee edited successfully");
        $scope.closeEmpEditDialog();
        $scope.getAllEmployees();
      }, function errorCallback() {
        alert("Error. Try Again!");
      });
    };

    $scope.deleteEmployee = function (employeeId) {
      if (confirm("Are you sure you want to delete this employee?")) {
        $http({
          method: 'DELETE',
          url: 'http://localhost:3002/api/employees/' + employeeId
        }).then(function successCallback() {
          alert("Deleted");
          $scope.getAllEmployees();
        });
      }
      else {
        return false;
      }
    };

    $scope.addBtn = function () {
      $scope.showEmpAddDialog = true;
    };

    $scope.editBtn = function () {
      $scope.showEmpEditDialog = true;
    };

  }])
  .directive('popUpDialog', function () {
    return {
      restrict: 'E', // directive element
      scope: false,
      templateUrl: 'views/empAddDialog.html',
      controller: function ($scope) {
        $scope.showEmpAddDialog = false;
        $scope.closeEmpAddDialog = function () {
          $scope.showEmpAddDialog = false;
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