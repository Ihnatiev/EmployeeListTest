angular.module('EmpApp', ['ngRoute'])
    .config(['$routeProvider',
        function ($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'views/home.html',
                    controller: 'HomeCtrl'
                })
                .when('/user/signup', {
                    templateUrl: 'auth/signup/signupUser.html',
                    controller: 'SignupCtrl'
                })
                .when('/user/login', {
                    templateUrl: 'auth/login/loginUser.html',
                    controller: 'LoginCtrl'
                })
                .when('/employees', {
                    templateUrl: 'views/empList.html',
                    controller: 'EmployeeCtrl'
                })
                .when('/employees/:employeeId', {
                    templateUrl: 'views/empViewDialog.html',
                    controller: 'EmployeeCtrl'
                })
                .otherwise({
                    redirectTo: '/user/login'
                });
        }
    ]);
    // .run(function ($rootScope, $location, Data) {
    //     $rootScope.$on("$routeChangeStart", function (event, next, current) {
    //         $rootScope.authenticated = false;
    //         Data.get('session').then(function (results) {
    //             if (results.uid) {
    //                 $rootScope.authenticated = true;
    //                 $rootScope.id = results.id;
    //                 $rootScope.name = results.name;
    //                 $rootScope.email = results.email;
    //             } else {
    //                 var nextUrl = next.$$route.originalPath;
    //                 if (nextUrl == '/user/signup' || nextUrl == '/user/login') {

    //                 } else {
    //                     $location.path("/user/login");
    //                 }
    //             }
    //         });
    //     });
    // });
