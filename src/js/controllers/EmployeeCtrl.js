var app = angular.module('EmpApp')
  .controller('EmployeeCtrl', [
    '$scope', '$http',
    function ($scope, $http) {
      $http({

        method: 'GET',
        url: 'http://localhost:3002/api/employees'

      }).then(function successCallback(response) {

        console.log(response);
        $scope.employees = response.data;

      }, function errorCallback(error) {

        alert("Error. Try Again!");

      });

    }]);

app.controller('DialogCtrl', function ($scope) {

  $scope.UpDialog = function () {
    $scope.showPopUpDialog = true;
    console.log('pressed');
  }

}).directive('popUpDialog', function () {
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
  });