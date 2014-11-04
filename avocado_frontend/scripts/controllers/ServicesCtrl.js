var servicesCtrl = angular.module('servicesCtrl', []);
servicesCtrl.controller('ServicesCtrl', ['$rootScope', '$scope', '$location', 'Api',
  function ($rootScope, $scope, $location, Api) {
    $rootScope.navActive = 'services';

    $scope.updateView = function() {
      Api.getServices().then(
        function (response) {
          $scope.services = response.data;
        });
    };

    $scope.updateView();

    $scope.radioButtonGroupOptions = {
      options: [
        {
          id: 'HR',
          name: 'Stundensatz'
        },
        {
          id: 'FR',
          name: 'Pauschalpreis'
        }
      ],
      idProperty: 'id',
      nameProperty: 'name',
      bootstrapSuffix: 'default',
    };

    $scope.VATOptions = {
      options: [
        {
          id: 'STVAT',
          name: 'verpflichtet'
        },
        {
          id: 'VATEX',
          name: 'befreit'
        },
        {
          id: 'PVATE',
          name: 'unecht befreit'
        }
      ],
      idProperty: 'id',
      nameProperty: 'name',
      bootstrapSuffix: 'default',
    };

    

    $scope.newService = {};
    $scope.newService.billing_type = 'HR';
    $scope.newService.vat_type = 'STVAT';

    $scope.verifyNewServiceInput = function() {
      // initial value
      inputValid = false;
      valid = [];

      valid.name = $scope.formNewService.name.$valid;
      valid.description = $scope.formNewService.description.$valid;
      valid.cost = $scope.formNewService.cost.$valid;

      if(valid.name && valid.description && valid.cost) {
        inputValid = true;
      }

      return inputValid;
      console.log('Valid?:')
      console.log(inputValid);
    };

    $scope.createNewService = function(newService) {
      promise = Api.createNewService(newService);
      promise.then(function(result) {
        console.log('Successfully created new service.');
        $scope.updateView();
      }, function(result) {
        console.log('Failed to create new service!');
        $scope.updateView();
      });
    };

}]);
