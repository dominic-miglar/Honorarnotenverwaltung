var invoiceCtrl = angular.module('InvoiceCtrl', []);
invoiceCtrl.controller('InvoiceCtrl', ['$rootScope', '$scope', '$location', '$routeParams', 'Api',
  function ($rootScope, $scope, $location, $routeParams, Api) {
    
    $rootScope.navActive = 'invoices';
    $scope.invoiceId = $routeParams.invoiceId;
    
    $scope.radioButtonGroupOptions = {
      options: [
        {
          id: 'OPN',
          name: 'Offen'
        },
        {
          id: 'CRE',
          name: 'Erstellt'
        },
        {
          id: 'CAN',
          name: 'Storniert'
        },
        {
          id: 'PAD',
          name: 'Bezahlt'
        }
      ],
      idProperty: 'id',
      nameProperty: 'name',
      bootstrapSuffix: 'default',
    };

    $scope.updateView = function() {
      Api.getInvoice($scope.invoiceId).then(function (response) {
        $scope.invoice = response.data;

        Api.getCustomer($scope.invoice.customer).then(function (response) {
          $scope.invoice.customer = response.data;
        });
      });

      Api.getCustomers().then(function (response) {
        $scope.customers = response.data;
      });

      Api.getConsumedServicesForInvoice($scope.invoiceId).then(function (response) {
        $scope.consumedServices = response.data;

        Api.getServices().then(function(response2) {

          for(var i = 0; i<$scope.consumedServices.length; i++) {
              $scope.consumedServices[i].service = $.grep(response2.data, function(e){ return e.id == $scope.consumedServices[i].service; })[0];
            }
        });
      });
    };

    $scope.updateView();

    $scope.updateInvoice = function(invoice) {
      invoice.customer = invoice.customer.id;
      promise = Api.updateInvoice(invoice);
      promise.then(
        function(result) {
          $scope.updateView();
        }
      );
    };

    $scope.verifyEditInput = function() {
      // initial value
      inputValid = true;

      return inputValid;
    };
}]);  
