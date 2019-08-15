'use strict';

var app = angular.module('EmpApp')
  .controller('EmployeeCtrl', ['$scope', '$http', '$log', function ($scope, $http, $log) {

    $scope.dpName = {
      model: null,
      availableDepartments: [
        { id: '1', name: 'HR' },
        { id: '2', name: 'Tech' },
        { id: '3', name: 'Finance' }
      ]
    };

    $scope.empActive = {
      value: false
    };

    $scope.getAllEmployees = function () {
      $http({
        method: 'GET',
        url: 'http://localhost:3002/api/employees'
      }).then(function successCallback(res) {
        if (res.status == 200)
          $scope.employees = res.data;
      }, function errorCallback() {
        alert('404 Not Found')
      }
      );
    };

    $scope.getEmployeeById = function (employeeId) {
      $scope.showEmpViewDialog = true;
      $http({
        method: 'GET',
        url: 'http://localhost:3002/api/employees/' + employeeId
      }).then(function successCallback(res) {
        $scope.employeeDetails = res.data;
      }, function errorCallback() {
        alert("Error");
      }
      );
    };

    $scope.createEmployee = function () {
      $http({
        method: 'POST',
        url: 'http://localhost:3002/api/employees',
        data: {
          'empName': $scope.empName,
          'empActive': $scope.empActive.value,
          'empDepartment': $scope.dpName.model
        },
        headers: { 'Content-Type': 'application/JSON' }
      }).then(function successCallback(data) {
        $scope.employees.push(data);
        alert("Employee added successfully");
        $scope.closeEmpAddDialog();
        $scope.getAllEmployees();
      }, function errorCallback(error) {
        alert('Unable to create an employee: ' + error.message);
      });
    };
    //////////////////////////////////////////////////////////////////////////////

    $scope.editBtn = function (employeeId) {
      $scope.showEmpEditDialog = true;
      $http({
        method: 'GET',
        url: 'http://localhost:3002/api/employees/' + employeeId
      }).then(function successCallback(res) {
        $scope.employeeEditDetails = res.data;
      }, function errorCallback() {
        alert("Error");
      }
      );
    };

    $scope.editEmployee = function (employeeId) {
      $http.put({
        url: 'http://localhost:3002/api/employees/' + employeeId,
        data: {
          'empName': $scope.empEditName,
          'empActive': $scope.empActive.value,
          'empDepartment': $scope.dpName.model,
          // 'empID': $scope.empID
        }
      }).then(function successCallback(data) {
        $scope.employees.push(data);
        // $scope.closeEmpEditDialog();
        // $scope.getAllEmployees();
      }, function errorCallback() {
        alert('Unable to update an employee');
        $scope.closeEmpEditDialog();
      });
    };
    ///////////////////////////////////////////////////////////////////////////////
    $scope.deleteEmployee = function (employeeId) {
      if (confirm("Are you sure you want to delete this employee?")) {
        $http({
          method: 'DELETE',
          url: 'http://localhost:3002/api/employees/' + employeeId
        }).then(function successCallback() {
          alert("Employee deleted");
          $scope.getAllEmployees();
        });
      }
      else {
        return false;
      }
    };

    $scope.pageChanged = function () {
      $scope.getAllEmployees();
    };

    $scope.changePageSize = function () {
      $scope.pageIndex = 1;
      $scope.getAllEmployees();
    };

    $scope.addBtn = function () {
      $scope.showEmpAddDialog = true;
    };

    $scope.searchEmployee = function () {
      $scope.search = $scope.searchName;
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