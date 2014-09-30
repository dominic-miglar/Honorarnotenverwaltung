var servicesCtrl = angular.module('serviceCtrl', []);
servicesCtrl.controller('ServiceCtrl', ['$rootScope', '$scope', '$location', 'Api', '$routeParams',
  function ($rootScope, $scope, $location, Api, $routeParams) {
     $rootScope.navActive = 'services';

    $scope.serviceId = $routeParams.serviceId;
    
    $scope.updateView = function() {
      Api.getService($scope.serviceId).then(function (response) {
        $scope.service = response.data;
      });
    };

    $scope.updateView();

    // Update the service
    $scope.updateService = function(service) {
      promise = Api.updateService(service);
      promise.then(
        function(result) {
          $scope.updateView();
        }
      );
    };
      
      $scope.deleteService = function(service) {
        promise = Api.deleteService(service);
        promise.then(
        function(result) {
          //$scope.updateView();
            $location.path('services');
        }
      );  
      };

      //TODO
    $scope.verifyEditInput = function() {
      // initial value
      inputValid = false;
      valid = []

      valid.name = $scope.formServiceName.serviceName.$valid;
      valid.description = $scope.formServiceDescription.serviceDescription.$valid;
      valid.billing_type = $scope.formServiceBillingType.serviceBillingType.$valid;
      valid.cost = $scope.formServiceCost.serviceCost.$valid;

      if(valid.name && valid.description && valid.billing_type && valid.cost) {
        inputValid = true;
      }

      return inputValid;
    };
      
}]);
