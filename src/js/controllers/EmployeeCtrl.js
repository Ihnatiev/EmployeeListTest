'use strict';

var app = angular.module('EmpApp')
  .controller('EmployeeCtrl', ['$scope', '$http', function ($scope, $http) {

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
      }).then(
        res => {
          if (res.status == 200)
            $scope.employees = res.data;
        }).catch(
          error => {
            alert(error.message);
          });
    };

    $scope.getEmployeeById = function (employeeId) {
      $scope.showEmpViewDialog = true;
      $http({
        method: 'GET',
        url: 'http://localhost:3002/api/employees/' + employeeId
      }).then(
        res => {
          $scope.employeeDetails = res.data;
        }).catch(
          error => {
            alert(error.message);
          });
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
      }).then(
        newEmp => {
          $scope.employees.push(newEmp);
          alert("Employee added successfully");
          document.forms["addEmployee"].reset();
          $scope.closeEmpAddDialog();
          $scope.getAllEmployees();
        }).catch(
          error => {
            alert(error.message);
          });
    };
    //////////////////////////////////////////////////////////////////////////////

    $scope.editBtn = function (employeeId) {
      $scope.showEmpEditDialog = true;
      $http({
        method: 'GET',
        url: 'http://localhost:3002/api/employees/' + employeeId
      }).then(
        res => {
          $scope.employeeEditDetails = res.data;
        }).catch(
          error => {
            alert(error.message);
          });
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
      }).then(
        editEmp => {
          $scope.employees.push(editEmp);
          // $scope.closeEmpEditDialog();
          // $scope.getAllEmployees();
          document.forms["editEmployee"].reset();
        }).catch(
          error => {
            alert(error.message);
            $scope.closeEmpEditDialog();
          });
    };
    ///////////////////////////////////////////////////////////////////////////////
    $scope.deleteEmployee = function (employeeId) {
      if (confirm("Are you sure you want to delete this employee?")) {
        $http({
          method: 'DELETE',
          url: 'http://localhost:3002/api/employees/' + employeeId
        }).then(
          function successCallback() {
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