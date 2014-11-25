var invoicesCtrl = angular.module('invoicesCtrl', []);
consumedServicesCtrl.controller('InvoicesCtrl', ['$rootScope', '$scope', '$location', 'Api',
    function ($rootScope, $scope, $location, Api) {
    	$rootScope.navActive = 'invoices';
      $scope.newInvoice = undefined;

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

      /*$scope.createNewInvoice = function(newConsumedService) {
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
    };*/

      $scope.updateView = function() {
        Api.getCustomers().then(
        function (resp1) {
          $scope.customers = resp1.data;

          Api.getInvoices().then(
              function(response) {
                $scope.invoices = response.data;

                for(var i = 0; i<$scope.invoices.length; i++) {
                  $scope.invoices[i].customer = $.grep($scope.customers, function(e){ return e.id == $scope.invoices[i].customer; })[0];
                  // TODO get Invoices
                }
              });

        });
      };


      $scope.verifyNewInvoiceInput = function() {
        inputValid = false;
        valid = [];

        valid.customer = $scope.formNewInvoice.customer.$valid;
        
        if(valid.customer) {
          inputValid = true;
        }

        return inputValid;
      };

      $scope.createNewInvoice = function(newInvoice) {
        newInvoice.customer = newInvoice.customer.id;
          Api.getCurrentUser().then(function(response) {
			Api.getUserProfile(response.data.id).then(function(response2) {		  
				newInvoice.issuer = response2.data[0].id;
				promise = Api.createNewInvoice(newInvoice);
				promise.then(function(result) {
					console.log('Successfully created new invoice.');
					$scope.updateView();
				},
				function(result) {
				  console.log('Failed to create new invoice.')
				  $scope.updateView();
				});
    		});
          });
      };

      $scope.updateView();
  } 
]);
