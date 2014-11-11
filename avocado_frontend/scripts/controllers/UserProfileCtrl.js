var userProfileCtrl = angular.module('UserProfileCtrl', []);
mainCtrl.controller('UserProfileCtrl', ['$rootScope', '$scope', '$location', 'Api',
    function ($rootScope, $scope, $location, Api) {

	$scope.updateView = function() {
    	$scope.user = Api.getCurrentUser();

    	$scope.user.then(function(response) {
    		$scope.user = response.data;

    		Api.getUserProfile($scope.user.id).then(function(response2) {
    			$scope.user_profile = response2.data[0];
    		});
    	});
	};

	$scope.updateView();

    $scope.updateUserProfile = function() {
	  promise = Api.updateUserProfile($scope.user_profile);
      promise.then(
        function(result) {
          $scope.updateView();
        }
      );	
    };

    $scope.verifyEditInput = function() {
      // initial value
      inputValid = false;
      valid = []

      valid.firstName = $scope.formCustomerFirstname.customerFirstname.$valid;
      valid.lastName = $scope.formCustomerLastname.customerLastname.$valid;
      valid.addressCountry = $scope.formCustomerAddressCountry.customerAddressCountry.$valid;
      valid.addressPostalCode = $scope.formCustomerAddressPcTown.customerAddressPostalCode.$valid;
      valid.addressTown = $scope.formCustomerAddressPcTown.customerAddressTown.$valid;
      valid.addressStreetAddress = $scope.formCustomerAddressStreetAddress.customerAddressStreetAddress.$valid;

      if(valid.firstName && valid.lastName && valid.addressCountry && valid.addressPostalCode && valid.addressTown && valid.addressStreetAddress) {
        inputValid = true;
      }

      return inputValid;
    };

}]);