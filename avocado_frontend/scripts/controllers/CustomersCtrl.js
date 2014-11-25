var customersCtrl = angular.module('customersCtrl', []);
customersCtrl.controller('CustomersCtrl', ['$rootScope', '$scope', '$location', 'Api',
  function ($rootScope, $scope, $location, Api) {
    $rootScope.navActive = 'customer_management';
    
    $scope.updateView = function() {
      Api.getCustomers().then(
        function (response) {
          $scope.customers = response.data;
        });
    };

    $scope.updateView();

    $scope.createNewCustomer = function(newCustomer) {
	if (newCustomer.birthdate !== undefined)	
        newCustomer.birthdate = newCustomer.birthdate + "T00:00";
		
      promise = Api.createNewCustomer(newCustomer);
      promise.then(function(result) {
        console.log('Successfully created new customer.');
        $scope.updateView();
      }, function(result) {
        console.log('Failed to create new customer!');
        $scope.updateView();
      });
    };

    $scope.verifyNewCustomerInput = function() {
      // initial value
      inputValid = false;
      valid = []

      valid.firstName = $scope.formNewCustomer.firstname.$valid;
      valid.lastName = $scope.formNewCustomer.lastname.$valid;
      valid.addressCountry = $scope.formNewCustomer.addressCountry.$valid;
      valid.addressPostalCode = $scope.formNewCustomer.addressPostalCode.$valid;
      valid.addressTown = $scope.formNewCustomer.addressTown.$valid;
      valid.addressStreetAddress = $scope.formNewCustomer.addressStreetAddress.$valid;

      if(valid.firstName && valid.lastName && valid.addressCountry && valid.addressPostalCode && valid.addressTown && valid.addressStreetAddress) {
        inputValid = true;
      }

      return inputValid;
    };

  }
]);  
