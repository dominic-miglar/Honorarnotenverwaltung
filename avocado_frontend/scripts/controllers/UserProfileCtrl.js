var userProfileCtrl = angular.module('UserProfileCtrl', []);
mainCtrl.controller('UserProfileCtrl', ['$rootScope', '$scope', '$location', 'Api',
    function ($rootScope, $scope, $location, Api) {
    	$scope.user = Api.getCurrentUser();

    	$scope.user.then(function(response) {
    		$scope.user = response.data;

    		Api.getUserProfile($scope.user.id).then(function(response2) {
    			$scope.user_profile = response2.data[0];
    		});
    	});



    }]);