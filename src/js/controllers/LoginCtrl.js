'use strict'

angular.module('app')
  .controller('LoginCtrl', Controller);

function Controller($scope, $http, $location, $localStorage, $log, Session, AuthService) {
  $scope.emailValid = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;

  $scope.signin = () => {
    $http({
      method: 'POST',
      url: 'https://localhost:3002/api/auth/login',
      data: {
        email: $scope.email,
        password: $scope.password
      }
    })
    // $http.post('http://localhost:3000/api/user/login', {
    //   email: $scope.email,
    //   password: $scope.pass
    // })
    .then(res => {
      if (res.status == 200) {
        alert(res.data.message);
        console.log(res.data.token);
        $log.info(Session.get('tokenId'));
        $location.path('/employees');
      }
    }).catch(err => {
      alert(err.data.message);
    });
  };
};


