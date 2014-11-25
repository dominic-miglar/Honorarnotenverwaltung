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

        Api.getServices().then(function (resp2) {
              $scope.services = resp2.data;
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
              $scope.consumedServices[i].gross = $scope.calculateGrossAmount($scope.consumedServices[i]);
          }
          $scope.grossAmount = $scope.calculateOverallGrossAmount();
          $scope.netAmount = $scope.calculateOverallNetAmount();
        });
      });
    };

    $scope.updateView();

    $scope.updateInvoice = function(invoice) {
      invoice.issuer = invoice.issuer.user;
      invoice.customer = invoice.customer.id;
      promise = Api.updateInvoice(invoice);
      promise.then(
        function(result) {
          $scope.updateView();
        }
      );
    };

    $scope.deleteInvoice = function(invoice) {
      for(var i = 0; i<$scope.consumedServices.length; i++) {
          $scope.consumedServices[i].invoice = undefined;
          $scope.consumedServices[i].service = $scope.consumedServices[i].service.id;
          Api.updateConsumedService($scope.consumedServices[i]);
      }

      invoice.issuer = invoice.issuer.user;
      invoice.customer = invoice.customer.id;
      promise = Api.deleteInvoice(invoice);
      promise.then(
        function(result) {
          $location.path('invoices');
        }
      );
    };
    
    $scope.removeConsumedService = function(consumedService) {
      consumedService.invoice = undefined;
      consumedService.service = consumedService.service.id;
      Api.updateConsumedService(consumedService).then(function(response) {
        $scope.updateView();
      });
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

    $scope.createNewConsumedService = function(newConsumedService) {
        newConsumedService.customer = $scope.invoice.customer.id;
        newConsumedService.service = newConsumedService.service.id;
        newConsumedService.invoice = $scope.invoice.id;

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


    $scope.generatePDF = function() {
      var dd = {
        content: [
          { 
            text: 'Honorarnote', 
            style: 'header', 
            alignment: 'center' 
          },
          {
            text: 'Rechnungsnr.: ' + $scope.invoice.id,
            alignment: 'right',
            margin: [0,0,0,20]
          },
          {
            alignment: 'justify',
            margin: [0,0,0,20],
            columns: [
              [
                {
                  text: 'Aussteller',
                  bold: true
                },
                {
                  text: $scope.invoice.issuer.last_name + ' ' + $scope.invoice.issuer.first_name
                },
                {
                  text: $scope.invoice.issuer.address.street_address
                },
                {
                  text: $scope.invoice.issuer.address.postal_code + ' ' + $scope.invoice.issuer.address.town
                },
                {
                  text: $scope.invoice.issuer.address.country
                }
              ],
              [
                {
                  text: 'Kunde',
                  bold: true
                },
                {
                  text: $scope.invoice.customer.last_name + ' ' + $scope.invoice.customer.first_name
                },
                {
                  text: $scope.invoice.customer.address.street_address
                },
                {
                  text: $scope.invoice.customer.address.postal_code + ' ' + $scope.invoice.customer.address.town
                },
                {
                  text: $scope.invoice.customer.address.country
                }
              ]
            ],
          },
          {
            table: {
                body: [
                    //Fill in with foreach loop here
                ]
            
            }
           } 
        ],
        styles: {
          header: {
            fontSize: 26,
            bold: true,
            alignment: 'justify',
            margin: [0,0,0,20]
          }
        }
      };

      var table_body = Array();
      table_body[0] = ['Dienstleistung', 'Menge', 'Datum', 'Kosten netto', 'Steuersatz', 'Kosten Brutto'];
      table_body[1] = ['', '', '', '', '', ''];
      for(var i = 0; i<$scope.consumedServices.length; i++) {
        table_body[i+2] = Array();
        table_body[i+2][0] = $scope.consumedServices[i].service.name;
        table_body[i+2][1] = String($scope.consumedServices[i].consumed);
        table_body[i+2][2] = String($scope.consumedServices[i].date_consumed);
        table_body[i+2][3] = '€ ' +  String(parseFloat($scope.consumedServices[i].consumed * $scope.consumedServices[i].service.cost).toFixed(2));

        if($scope.consumedServices[i].service.vat_type == 'STVAT' && $scope.invoice.customer.is_vat_exempt == false)
          table_body[i+2][4] = '20%';
        else
          table_body[i+2][4] = 'nein'

        table_body[i+2][5] = '€ ' + String(parseFloat($scope.consumedServices[i].gross).toFixed(2));
      }

      //if($scope.invoice.customer.is_vat_exempt) {
      //  dd['content'][0]['text'] = 'Rechnung';
      //}

      table_body[table_body.length] = ['', '', '', '', '', ''];
      table_body[table_body.length] = ['Summe', '', '', '€ '+ String(parseFloat($scope.netAmount).toFixed(2)), '', '€ '+ String(parseFloat($scope.grossAmount).toFixed(2))];

      dd['content'][3]['table']['body'] = table_body;

      pdfMake.createPdf(dd).download();

    };

    $scope.verifyNewConsumedServiceInput = function() {
      return true;
    };
}]);  
