'use strict'

angular.module('app')
  .controller('LoginCtrl', Controller);

function Controller($scope, $http, $location, $localStorage, $log, Session, AuthService) {
  $scope.emailValid = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;

  $scope.user = {};
  $scope.error = false;

  $scope.signin = function (email) {

    $http.post('http://localhost:3002/api/user/login', $scope.user)
      .then(function (response) {
        var data = response.data;
        if (data.status == "true") {
          $localStorage.currentUser = { email: email, token: response.token };
          $http.defaults.headers.common.Authorization = 'Bearer ' + response.token;
          document.forms["login"].reset();
          AuthService.setUser(data);
        } else {
          $scope.error = true;
        }

        $log.info(Session.get('tokenId'));
        $location.path('/employees');
      });

  };
};


