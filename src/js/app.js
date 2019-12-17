var app = angular.module('app', ['ui.router', 'ui.bootstrap', 'ngStorage', 'ngCookies'])
  .config(config);
// .run(run);
function config($stateProvider, $urlRouterProvider) {
  // default route
  
  $stateProvider
    .state('signIn', {
      url: '/user/login',
      templateUrl: 'auth/login/loginUser.html',
      controller: 'LoginCtrl'
    })
    .state('createUser', {
      url: '/user/signup',
      templateUrl: 'auth/signup/signupUser.html',
      controller: 'SignupCtrl',
      authenticate: true
    })
    .state('allEmployees', {
      url: '/employees',
      templateUrl: 'views/empList.html',
      controller: 'EmployeeCtrl'
    })
    .state('view.id', {
      url: '/employees/:employeeId',
      templateUrl: 'views/empViewDialog.html',
      controller: 'EmployeeCtrl',
      authenticate: true
    })
    .state('editEmployee', {
      url: '/employees/:employeeId',
      templateUrl: 'views/empEditDialog.html',
      controller: 'EmployeeCtrl',
      authenticate: true
    });
    $urlRouterProvider.otherwise("/employees");
};

function run($rootScope, $http, $location, $localStorage) {
  if ($localStorage.currentUser) {
    $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.currentUser.token;
  }

  $rootScope.$on('$locationChangeStart', function (event, next, current) {
    var publicPages = ['/user/signup'];
    var restrictedPage = publicPages.indexOf($location.path()) === -1;
    if (restrictedPage && !$localStorage.currentUser) {
      $location.path('/user/login');
    }
  });
};

