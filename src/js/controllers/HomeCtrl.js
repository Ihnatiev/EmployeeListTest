angular.module('app')
.controller('HomeCtrl', [
    '$scope',
    function($scope) {
        $scope.message = 'I like Gulp!';
    }
]);
