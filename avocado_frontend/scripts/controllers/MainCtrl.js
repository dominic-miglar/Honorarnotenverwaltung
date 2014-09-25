var mainCtrl = angular.module('mainCtrl', []);
mainCtrl.controller('MainCtrl', ['$rootScope', '$scope', '$location',
    function ($rootScope, $scope, $location) {
    	$rootScope.navActive = 'dashboard';
    }]);