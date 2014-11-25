'use strict';

var avocadoApp = angular.module('avocadoApp', [
    'ngRoute',
    'ngResource',
    'ngCookies',
    'mainCtrl',
    'settingsCtrl',
    'customersCtrl',
    'customerCtrl',
    'servicesCtrl',
    'serviceCtrl',
    'consumedServicesCtrl',
    'invoicesCtrl',
    'InvoiceCtrl',
    'avocadoApi',
    'loginCtrl',
    'radioButtonGroup',
    'UserProfileCtrl',
    ]);

avocadoApp.config(['$routeProvider', '$locationProvider', '$httpProvider',
    function AppConfig($routeProvider, $locationProvider, $httpProvider) {
        $routeProvider.
        when('/', {
            title: 'Rechnungen',
            templateUrl: 'views/invoices.html',
            controller: 'InvoicesCtrl'
        }).
        when('/customers/:customerId/', {
            title: 'Kunde - Detail',
            templateUrl: 'views/customer.html',
            controller: 'CustomerCtrl'
        }).
        when('/customers/', {
            title: 'Kundenverwaltung',
            templateUrl: 'views/customers.html',
            controller: 'CustomersCtrl'
        }).
        when('/services/', {
            title: 'Services',
            templateUrl: 'views/services.html',
            controller: 'ServicesCtrl'
        }).
        when('/services/:serviceId', {
            title: 'Service - Detail',
            templateUrl: 'views/service.html',
            controller: 'ServiceCtrl'
        }).
        when('/consumedservices/', {
            title: 'Consumed Services',
            templateUrl: 'views/consumedservices.html',
            controller: 'ConsumedServicesCtrl'
        }).
        when('/invoices/', {
            title: 'Rechnungen',
            templateUrl: 'views/invoices.html',
            controller: 'InvoicesCtrl'
        }).
        when('/invoices/:invoiceId', {
            title: 'Rechnung',
            templateUrl: 'views/invoice.html',
            controller: 'InvoiceCtrl'
        }).
        when('/settings/', {
            title: 'Einstellungen',
            templateUrl: 'views/settings.html',
            controller: 'SettingsCtrl'
        }).
        when('/userprofile/', {
            title: 'User Profil',
            templateUrl: 'views/userprofile.html',
            controller: 'UserProfileCtrl'
        }).
        otherwise({
            redirectTo: '/'
        });

        $httpProvider.defaults.xsrfCookieName = 'djangotoken';
        $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    }]);

avocadoApp.run(['$rootScope', '$http', '$cookieStore',
    function($rootScope, $http, $cookieStore) {
        if($cookieStore.get('djangotoken')) {
            $http.defaults.headers.common.Authorization = 'Token ' + $cookieStore.get('djangotoken');
            $http.defaults.headers.post.Authorization = 'Token ' + $cookieStore.get('djangotoken');
            $rootScope.isLoggedIn = true;
        }
    }]);
