var loginCtrl = angular.module('loginCtrl', []);
mainCtrl.controller('LoginCtrl', ['$rootScope', '$scope', '$location', '$http', '$cookieStore', 'Api',
    function ($rootScope, $scope, $location, $http, $cookieStore, Api) {

    	if($cookieStore.get('username') && $cookieStore.get('djangotoken')) {
    		$rootScope.username = $cookieStore.get('username');
            
            var token = $cookieStore.get('djangotoken');
            
            // Set HTTP default headers, sent with every request (POST and GET)
            $http.defaults.headers.post.Authorization = 'Token ' + token;
            $http.defaults.headers.common.Authorization = 'Token ' + token;
            // Set root scope logged in flag
            $rootScope.isLoggedIn = true;
    	}

    	//get the entered credentials from the view
		$scope.getCredentials = function () {
		return {
			username: $scope.username,
			password: $scope.password
			};
		};

    	$scope.login = function() {
    		promise = Api.login($scope.getCredentials());
    		promise.success(function(response) {
    			$cookieStore.put('djangotoken', response.token);
    			$cookieStore.put('username', $scope.getCredentials().username);
    			// Set HTTP default headers, sent with every request (POST and GET)
    			$http.defaults.headers.post.Authorization = 'Token ' + response.token;
    			$http.defaults.headers.common.Authorization = 'Token ' + response.token;
    			// Set root scope logged in flag
    			$rootScope.isLoggedIn = true;
    			$rootScope.username = $cookieStore.get('username');
    			return true;
    		}).error(function(response) {
    			$rootScope.isLoggedIn = false;
    			return false;
    		});
    	};

    	$scope.logout = function() {
    		$cookieStore.remove('djangotoken');
      		$cookieStore.remove('username');
      		// Remove setting of default HTTP headers, so they are not sent with every request
      		// anymore
      		$http.defaults.headers.post.Authorization = undefined;
      		$http.defaults.headers.common.Authorization = undefined;
            $rootScope.isLoggedIn = false;
            $rootScope.username = undefined;
      		return true;
    	};
    }]);
