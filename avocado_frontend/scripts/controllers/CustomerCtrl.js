var customerCtrl = angular.module('customerCtrl', []);
customerCtrl.controller('CustomerCtrl', ['$rootScope', '$scope', '$location', '$routeParams', 'Api',
  function ($rootScope, $scope, $location, $routeParams, Api) {
    
    $rootScope.navActive = 'customer_management';
    $scope.customerId = $routeParams.customerId;
    
    $scope.updateView = function() {
      Api.getCustomer($scope.customerId).then(function (response) {
        $scope.customer = response.data;
      });
    };

    $scope.updateView();

    // Update the customer
    $scope.updateCustomer = function(customer) {
      promise = Api.updateCustomer(customer);
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

    

  }
]);  
