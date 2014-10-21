var settingsCtrl = angular.module('settingsCtrl', []);
settingsCtrl.controller('SettingsCtrl', ['$rootScope', '$scope', '$location',
    function ($rootScope, $scope, $location) {
    	$rootScope.navActive = 'settings';
    }]);
