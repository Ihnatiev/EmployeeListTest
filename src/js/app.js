var app = angular.module('app', ['ui.router', 'ngStorage', 'ngCookies'])
.config(config)
.run(run);
function config($stateProvider, $urlRouterProvider) {
    // default route
    $urlRouterProvider.otherwise("/");
    $stateProvider
            .state('/home', {
                url: '/',
                templateUrl: 'views/home.html',
                controller: 'HomeCtrl'
            })
            .state('/login', {
                url: '/user/login',
                templateUrl: 'auth/login/loginUser.html',
                controller: 'LoginCtrl',
                controllerAs: 'vm'
            })
            .state('/signup', {
                url: '/user/signup',
                templateUrl: 'auth/signup/signupUser.html',
                controller: 'SignupCtrl'
            })
            .state('/employees', {
                url: '/employees',
                templateUrl: 'views/empList.html',
                controller: 'EmployeeCtrl'
            })
            .state('/:employeeId', {
                url: '/employees/:employeeId',
                templateUrl: 'views/empViewDialog.html',
                controller: 'EmployeeCtrl'
            });
    }

    function run($rootScope, $http, $location, $localStorage){
    if ($localStorage.currentUser) {
        $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.currentUser.token;
    }

    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        var publicPages = ['/user/login'];
        var restrictedPage = publicPages.indexOf($location.path()) === -1;
        if (restrictedPage && !$localStorage.currentUser) {
            $location.path('/user/login');
        }
    });
};

