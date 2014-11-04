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
    getResource: function(resourceLink) {
      return $http.get(resourceLink);
    },

    /* Customers */
    getCustomers: function () {
      return $http.get(configuration.apiUrl + 'customers/');
    },
    getCustomer: function(customerId) {
      return $http.get(configuration.apiUrl + 'customers/' + customerId + '/');
    },
    updateCustomer: function(customer) {
      return $http.put(configuration.apiUrl + 'customers/' + customer.id + '/', customer);
    },
    deleteCustomer: function(customer) {
      return $http.delete(configuration.apiUrl + 'customers/' + customer.id + '/');
    },
    createNewCustomer: function(newCustomer) {
      return $http.post(configuration.apiUrl + 'customers/', newCustomer);
    },

    /* Services */
    getServices: function() {
      return $http.get(configuration.apiUrl + 'services/');
    },
    createNewService: function(newService) {
      return $http.post(configuration.apiUrl + 'services/', newService);
    },
    getService: function(serviceId) {
      return $http.get(configuration.apiUrl + 'services/' + serviceId + '/');
    },
    deleteService: function(service) {
      return $http.delete(configuration.apiUrl + 'services/' + service.id + '/');
    },
    updateService: function(service) {
      return $http.put(configuration.apiUrl + 'services/' + service.id + '/', service);
    },

    /* Consumed Services */
    getConsumedServices: function() {
      return $http.get(configuration.apiUrl + 'consumedservices/');
    },
    createNewConsumedService: function(newConsumedService) {
      return $http.post(configuration.apiUrl + 'consumedservices/', newConsumedService);
    },
    getConsumedServicesForInvoice: function(invoiceID) {
      return $http.get(configuration.apiUrl + 'consumedservices/?invoice=' + invoiceID);
    },
    /* Invoices */
    getInvoices: function() {
       return $http.get(configuration.apiUrl + 'invoices/');
    },
    getInvoice: function(invoiceId) {
      return $http.get(configuration.apiUrl + 'invoices/' + invoiceId + '/');
    },
    deleteInvoice: function(invoice) {
      return $http.delete(configuration.apiUrl + 'invoices/' + invoice.id + '/');
    },
    updateInvoice: function(invoice) {
      return $http.put(configuration.apiUrl + 'invoices/' + invoice.id + '/', invoice);
    },
    createNewInvoice: function(newInvoice) {
      return $http.post(configuration.apiUrl + 'invoices/', newInvoice);
    },

  };
});
