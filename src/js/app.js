angular.module('EmpApp', ['ngRoute'])
    .config(['$routeProvider', '$locationProvider',
        function ($routeProvider, $locationProvider) {
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
                });
        }
    ]);
