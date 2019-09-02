'use strict'

angular.module('app')
  .controller('LoginCtrl', Controller);

function Controller($scope, $http, $location, $localStorage, $log, Session, AuthService) {
  $scope.emailValid = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;

  $scope.signin = function () {

    $http.post('http://localhost:3000/api/user/login', {
      email: $scope.user.email, password: $scope.user.password})
      .then(function () {
        $log.info(Session.get('tokenId'));
        $location.path('/employees');
      });

  };
};


