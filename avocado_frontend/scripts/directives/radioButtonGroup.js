var radioButtonGroup = angular.module('radioButtonGroup', []);

radioButtonGroup.directive('radioButtonGroup', function() {
	return {
		restrict: 'E',
		scope: {
			model: '=',
			options: '=',
			id: '=',
			name: '=',
			suffix: '='
		},
		controller: function($scope) {
			$scope.activate = function(option, $event) {
				$scope.model = option[$scope.id];
				if($event.stopPropagation) {
					$event.stopPropagation();
				}
				if($event.preventDefault) {
					$event.preventDefault();
				}
				$event.cancelBubble = true;
				$event.returnValue = false;
			};
			$scope.isActive = function(option) {
				return option[$scope.id] == $scope.model;
			};
			$scope.getName = function(option) {
				return option[$scope.name];
			};
		},
		template: "<button type='button' class='btn btn-{{suffix}}' ng-class='{active: isActive(option)}' ng-repeat='option in options' ng-click='activate(option,$event)'>" +
		"{{getName(option)}} " + "</button>",
	};
});

