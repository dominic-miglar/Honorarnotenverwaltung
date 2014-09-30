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
      return $http.post(configuration.apiAuthUrl, user_data);
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
    getServices: function() {
      return $http.get(configuration.apiUrl + 'services/');
    },
    createNewService: function(newService) {
      return $http.post(configuration.apiUrl + 'services/', newService);
    },
  };
});
