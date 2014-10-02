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
    'avocadoApi',
    'loginCtrl',
    'radioButtonGroup',
    ]);

avocadoApp.config(['$routeProvider', '$locationProvider', '$httpProvider',
    function AppConfig($routeProvider, $locationProvider, $httpProvider) {
        $routeProvider.
        when('/', {
            title: 'avocado Home',
            templateUrl: 'views/main.html',
            controller: 'MainCtrl'
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
        when('/settings/', {
            title: 'Einstellungen',
            templateUrl: 'views/settings.html',
            controller: 'SettingsCtrl'
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
