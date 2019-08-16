angular.module('EmpApp', ['ngRoute'])
    .config(['$routeProvider', '$locationProvider',
        function ($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'views/home.html',
                    controller: 'HomeCtrl'
                })
                .when('/employees', {
                    templateUrl: 'views/empList.html',
                    controller: 'EmployeeCtrl'
                })
                .when('/employees/:employeeId', {
                    templateUrl: 'views/empViewDialog.html',
                    controller: 'EmployeeCtrl'
                })
                .when('/user/signup', {
                    templateUrl: 'auth/signup/signupUser.html',
                    controller: 'SignupCtrl'
                })
                .when('/user/login', {
                    templateUrl: 'auth/login/loginUser.html',
                    controller: 'LoginCtrl'
                });
        }
    ]);
