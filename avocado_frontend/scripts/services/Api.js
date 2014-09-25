var avocadoApi = angular.module('avocadoApi', []);

avocadoApi.factory('Api', function ($rootScope, $http, $cookieStore, $q) {
  return {
    login: function (credentials) {
      $http.defaults.headers.post.Auhorization = undefined;
      $http.defaults.headers.common.Authorization = undefined;
      var user_data = {
        "username": credentials.username,
        "password": credentials.password
      };
      var result = $http.post(configuration.apiAuthUrl, user_data);
      result.success(function (response) {
        $cookieStore.put('djangotoken', response.token);
        $cookieStore.put('username', credentials.username);
        // Set HTTP default headers, sent with every request (POST and GET)
        $http.defaults.headers.post.Authorization = 'Token ' + response.token;
        $http.defaults.headers.common.Authorization = 'Token ' + response.token;
        // Set root scope logged in flag
        $rootScope.isLoggedIn = true;
        return true;
      })
        .error(function (response) {
          return false; // TODO: return error msg
        });
    },
    logout: function () {
      // Remove previous set cookies
      $cookieStore.remove('djangotoken');
      $cookieStore.remove('username');
      // Remove setting of default HTTP headers, so they are not sent with every request
      // anymore
      $http.defaults.headers.post.Authorization = undefined;
      $http.defaults.headers.common.Authorization = undefined;
      return true;
    },
    getCustomers: function () {
      return $http.get(configuration.apiUrl + 'customers/');
    },
    getCustomer: function(customerId) {
      return $http.get(configuration.apiUrl + 'customers/' + customerId + '/');
    },
    getAddresses: function () {
      return $http.get(configuration.apiUrl + 'addresses/');
    },
    getAddress: function(addressId) {
      return $http.get(configuration.apiUrl + 'addresses/' + addressId + '/');
    },
    getResource: function(resourceLink) {
      return $http.get(resourceLink);
    },
    updateCustomer: function(customer) {
      return $http.put(configuration.apiUrl + 'customers/' + customer.id + '/', customer);
      //return $http.patch(configuration.apiUrl + 'customers/' + customer.id + '/', customer);
    },
    createNewCustomer: function(newCustomer) {
      return $http.post(configuration.apiUrl + 'customers/', newCustomer);
    },
  };
});
