var app = angular.module('app', ['ui.router', 'ui.bootstrap', 'ngStorage']);
app.config([
  '$stateProvider',
  '$urlRouterProvider',
  authConfig
])

function authConfig(
  $stateProvider,
  $urlRouterProvider) {

  $stateProvider
    .state('index', {
      url: '/employees',
      templateUrl: 'views/empList.html',
      controller: 'EmployeeCtrl'
    })
    .state('login', {
      url: '/user/login',
      templateUrl: 'auth/login/loginUser.html',
      controller: 'LoginCtrl as lc'
    })
    .state('signup', {
      url: '/user/signup',
      templateUrl: 'auth/signup/signupUser.html',
      controller: 'SignupCtrl as sc',
      authenticate: true
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

app.run([
  '$rootScope',
  '$state',
  'authService',
  authRun
]);

function authRun($rootScope, $state, authService) {
  $rootScope.$on('$stateChangeStart', function (event, toState) {
    if (toState.data && toState.data.accessLevel) {
      var user = authService.getUserData();
      if (!(toState.data.accessLevel & user.role)) {
        event.preventDefault();
        $state.go('index');
        return;
      }
    }
  });
}
function run($rootScope, $http, $location, $localStorage) {
  if ($localStorage.currentUser) {
    $http.defaults.headers.common.Authorization = 'Basic ' + $localStorage.currentUser.token;
  }

  $rootScope.$on('$locationChangeStart', function (event, next, current) {
    var publicPages = ['/user/signup'];
    var restrictedPage = publicPages.indexOf($location.path()) === -1;
    if (restrictedPage && !$localStorage.currentUser) {
      $location.path('/user/login');
    }
  });
};

