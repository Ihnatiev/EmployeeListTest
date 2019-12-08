'use strict';

var app = angular.module('app')
  .controller('EmployeeCtrl', ['$scope', '$http', function ($scope, $http) {

    const path = 'https://localhost:3002/api/';

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

    $scope.currentPage = 0;
    $scope.totalEmployees = 0;

    $scope.onNext = function () {
      $scope.currentPage = $scope.pageIndex + 1;
      $scope.postsPerPage = $scope.pagesize;
      $scope.getAllEmployees();
    };

    $scope.onPrevious = function () {
      $scope.currentPage = $scope.pageIndex - 1;
      $scope.getAllEmployees();
    };

    $scope.getAllEmployees = function () {
      $http.get(path + `employees?pagesize=2&page=${$scope.currentPage}`)
        .then(res => {
          if (res.status == 200) {
            $scope.employees = res.data.employees;
            $scope.totalEmployees = res.data.maxEmployees;
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
      $http.post(path + 'employees', {
        'empName': $scope.empName,
        'empActive': $scope.empActive.value,
        'empDepartment': $scope.dpName.model
      }).then(newEmp => {
        $scope.employees.push(newEmp);
        alert(newEmp.data.message);
        document.forms["addEmployee"].reset();
        $scope.closeEmpAddDialog();
        $scope.getAllEmployees();
      }).catch(err => {
        alert(err.data.message);
        $scope.closeEmpAddDialog();
      });
    };
    //////////////////////////////////////////////////////////////////////////////

    $scope.editBtn = function (employeeId) {
      $scope.showEmpEditDialog = true;
      $http.get(path + 'employees/' + employeeId)
        .then(
          res => {
            $scope.employeeEditDetails = res.data.employee;
          })
        .catch(
          err => {
            alert(err.data.message);
          });
    };

    $scope.editEmployee = function (employeeId) {
      $http.put(path + 'employees/' + employeeId, {
        'empName': $scope.empEditName,
        'empActive': $scope.empActive.value,
        'empDepartment': $scope.dpName.model,
        // 'empID': $scope.empID
      }).then(
        editEmp => {
          $scope.employees.push(editEmp);
          // $scope.closeEmpEditDialog();
          // $scope.getAllEmployees();
          document.forms["editEmployee"].reset();
        }).catch(
          err => {
            alert(err.data.message);
            $scope.closeEmpEditDialog();
          });
    };
    ///////////////////////////////////////////////////////////////////////////////
    $scope.deleteEmployee = function (employeeId) {
      if (confirm("Are you sure you want to delete this employee?")) {
        $http.delete(path + 'employees/' + employeeId)
          .then(
            result => {
              alert(result.data.message);
              $scope.getAllEmployees();
            }).catch(
              err => {
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