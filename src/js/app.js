angular.module('EmpApp', ['ngRoute'])
    .config(['$routeProvider',
        function ($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'views/home.html',
                    controller: 'HomeCtrl'
                })
                .when('/employees', {
                    templateUrl: 'views/empList.html',
                    controller: 'EmployeeCtrl'
                });
        }
    ]);
