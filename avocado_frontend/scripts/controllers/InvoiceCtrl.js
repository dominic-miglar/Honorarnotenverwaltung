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
    };

    $scope.updateView();

    

    $scope.verifyEditInput = function() {
      // initial value
      inputValid = true;

      return inputValid;
    };
}]);  
