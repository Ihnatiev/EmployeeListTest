'use strict';

var app = angular.module('app')
  .controller('EmployeeCtrl', ['authService', '$scope', '$http', '$window', function (authService, $scope, $http, $window) {

    var path = 'https://localhost:6969/api/';
    var vm = this;
    $scope.dpName = {
      model: null,
      availableDepartments: [
        { id: 1, name: 'HR' },
        { id: 2, name: 'Tech' },
        { id: 3, name: 'Finance' }
      ]
    };

    $scope.empActive = {
      value: false
    };

    function init() {
      userIsAuthenticated = authService.getIsAuth();
    }
    init();

    $scope.maxSize = 5;
    $scope.totalCount = 1;
    $scope.pageIndex = 0;
    $scope.pageSizeSelected = 5;

    $scope.getAllEmployees = function () {
      $http.get(path + 'employees?page=' + $scope.pageIndex + '&pagesize=' + $scope.pageSizeSelected)
        .then(res => {
          if (res.status == 200) {
            $scope.employees = res.data.employees;
            $scope.totalCount = res.data.maxEmployees;
          }
        }).catch(err => {
          alert(err);
        });
    };

    $scope.getEmployeeById = function (employeeId) {
      $scope.showEmpViewDialog = true;
      $http.get(path + 'employees/' + employeeId)
        .then(res => {
          $scope.employeeDetails = res.data.employee;
        }).catch(err => {
          alert(err.data.message);
        });
    };

    $scope.createEmployee = function () {
      var formData = {
        'empName': $scope.empName,
        'empActive': $scope.empActive.value,
        'empDepartment': $scope.dpName.model
      };
      $http({
        method: 'post',
        headers: {
          "Content-Type": "application/json",
          "authorization": $window.localStorage.getItem('token')
        },
        url: path + 'employees/',
        data: formData
      }).then(response => {
        alert(response.data.message);
        document.forms["addEmployee"].reset();
        $scope.closeEmpAddDialog();
        $scope.getAllEmployees();
      }).catch(err => {
        alert(err.data.message);
        $scope.closeEmpAddDialog();
      });
    };

    $scope.onEdit = function (employeeId) {
      var formData = {
        'empName': $scope.empName,
        'empActive': $scope.empActive.value,
        'empDepartment': $scope.dpName.model
      };
      $http({
        method: 'put',
        headers: {
          "Content-Type": "application/json",
          "authorization": $window.localStorage.getItem('token')
        },
        url: path + 'employees/' + employeeId,
        data: formData
      }).then(function (response) {
        alert(response.data.message);
        document.forms["editEmployee"].reset();
        $scope.closeEmpEditDialog();
        $scope.getAllEmployees();
      }).catch(err => {
        alert(err.data.message);
        $scope.closeEmpEditDialog();
      });
    };

    $scope.deleteEmployee = function (employeeId) {
      if (confirm("Are you sure you want to delete this employee?")) {
        $http({
          method: 'delete',
          headers: {
            "authorization": $window.localStorage.getItem('token')
          },
          url: path + 'employees/' + employeeId
        }).then(result => {
          alert(result.data.message);
          $scope.getAllEmployees();
        }).catch(err => {
          alert(err.data.message);
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
      $scope.pageIndex = 0;
      $scope.getAllEmployees();
    };

    $scope.addBtn = function () {
      $scope.showEmpAddDialog = true;
    };

    $scope.editBtn = function (employeeId) {
      $scope.showEmpEditDialog = true;
      $http.get(path + 'employees/' + employeeId)
        .then(res => {
          $scope.employeeEditDetails = res.data.employee;
        }).catch(err => {
          alert(err.data.message);
        });
    };

    $scope.searchEmployee = function () {
      $scope.search = $scope.searchName;
    };

    $scope.onLogout = () => {
      authService.logout();
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