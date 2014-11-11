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

        Api.getUserProfile($scope.invoice.issuer).then(function(response) {
          $scope.invoice.issuer = response.data[0];
          // console.log($scope.invoice.issuer);
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
              // DEBUG //
              console.log($scope.consumedServices);
              console.log($scope.invoice.customer);
              console.log($scope.calculateGrossAmount($scope.consumedServices[i]));
              $scope.consumedServices[i].gross = $scope.calculateGrossAmount($scope.consumedServices[i]);
              // END DEBUG //
          }
          $scope.grossAmount = $scope.calculateOverallGrossAmount();
          $scope.netAmount = $scope.calculateOverallNetAmount();
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

    $scope.calculateOverallGrossAmount = function() {
      var grossAmount = 0;
      for(var i = 0; i<$scope.consumedServices.length; i++) {
        var cost = $scope.consumedServices[i].service.cost;
        var consumed = $scope.consumedServices[i].consumed;
        var net = cost*consumed;
        if($scope.invoice.customer.is_vat_exempt) {
          var gross = net;
        }
        else if($scope.consumedServices[i].service.vat_type == 'STVAT') {
          var gross = net + net*0.2;
        }
        else if($scope.consumedServices[i].service.vat_type == 'VATEX') {
          var gross = net;
        }
        else if($scope.consumedServices[i].service.vat_type == 'PVATE') {
          var gross = net;
        }
        grossAmount += gross;
      }
      return grossAmount;
    };

    $scope.calculateGrossAmount = function(consumedService) {
      var cost = consumedService.service.cost;
      var consumed = consumedService.consumed;
      var net = cost*consumed;
      var gross = 0;
      if($scope.invoice.customer.is_vat_exempt) {
        gross = net;
      }
      else if(consumedService.service.vat_type == 'STVAT') {
        gross = net*1.2;
      }
      else if(consumedService.service.vat_type == 'VATEX') {
        gross = net;
      }
      else if(consumedService.service.vat_type == 'PVATE') {
        gross = net;
      }
      return gross;
    };

    $scope.calculateOverallNetAmount = function() {
      var netAmount = 0;
      for(var i = 0; i<$scope.consumedServices.length; i++) {
        var cost = $scope.consumedServices[i].service.cost;
        var consumed = $scope.consumedServices[i].consumed;
        var net = cost*consumed;
        netAmount += net;
      }
      return netAmount;
    };

}]);  
