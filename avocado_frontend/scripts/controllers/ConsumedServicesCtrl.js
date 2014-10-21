var consumedServicesCtrl = angular.module('consumedServicesCtrl', []);
consumedServicesCtrl.controller('ConsumedServicesCtrl', ['$rootScope', '$scope', '$location', 'Api',
    function ($rootScope, $scope, $location, Api) {
    	$rootScope.navActive = 'consumedservices';

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

    	$scope.updateView = function() {
    		Api.getConsumedServices().then(
          function(response) {
            $scope.consumedServices = response.data;
            console.log($scope.consumedServices);
          });
    	};

      //$scope.updateServices();
      $scope.updateView();
  }
]);
