var consumedServicesCtrl = angular.module('consumedServicesCtrl', []);
consumedServicesCtrl.controller('ConsumedServicesCtrl', ['$rootScope', '$scope', '$location', 'Api',
    function ($rootScope, $scope, $location, Api) {
    	$rootScope.navActive = 'consumedservices';
      $scope.newConsumedService = undefined;

      /*$scope.updateServices = function() {
        Api.getServices().then(
          function(response) {
            $scope.services = response.data;
            services = [];
            for(service in $scope.consumedServices) {
              services[service.id] = service;
            }
          });
      };*/

      $scope.createNewConsumedService = function(newConsumedService) {
        newConsumedService.customer = newConsumedService.customer.id;
        newConsumedService.service = newConsumedService.service.id;
        if (newConsumedService.invoice != undefined)
          newConsumedService.invoice = newConsumedService.invoice.id;

        newConsumedService.date_consumed = newConsumedService.date + "T" + newConsumedService.time;
        promise = Api.createNewConsumedService(newConsumedService);
        promise.then(function(result) {
          console.log('Successfully created new consumed service.');
          $scope.updateView();
        }, function(result) {
          console.log('Failed to create new consumed service!');
          $scope.updateView();
        });
    };

      $scope.updateView = function() {
        Api.getCustomers().then(
        function (resp1) {
          $scope.customers = resp1.data;

          Api.getServices().then(
            function (resp2) {
              $scope.services = resp2.data;

              // TODO get Invoices

            Api.getConsumedServices().then(
                function(response) {
                  $scope.consumedServices = response.data;

                  for(var i = 0; i<$scope.consumedServices.length; i++) {
                    $scope.consumedServices[i].service = $.grep($scope.services, function(e){ return e.id == $scope.consumedServices[i].service; })[0];
                    $scope.consumedServices[i].customer = $.grep($scope.customers, function(e){ return e.id == $scope.consumedServices[i].customer; })[0];
                    // TODO get Invoices
                  }
                  console.log($scope.consumedServices);
                });
            

            });

        });
      };


      $scope.verifyNewConsumedServiceInput = function() {
      // initial value
      inputValid = false;
      valid = [];

      valid.service = $scope.formNewConsumedService.service.$valid;
      valid.customer = $scope.formNewConsumedService.customer.$valid;

      if ($scope.newConsumedService != undefined) {
        if($scope.newConsumedService.service.billing_type == "HR")
          valid.consumed = $scope.formNewConsumedService.consumed.$valid;
        else {
          valid.consumed = true;
        }
      }
      
      valid.date = $scope.formNewConsumedService.date.$valid;
      valid.time = $scope.formNewConsumedService.time.$valid;

      if(valid.service && valid.customer && valid.consumed && valid.date && valid.time) {
        inputValid = true;
      }

      return inputValid;
    };

      //$scope.updateServices();
      $scope.updateView();
  }
]);
