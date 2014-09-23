'use strict';

var avocadoApp = angular.module('avocadoApp', [
    'ngRoute',
    'ngResource',
    'ngCookies'
    ])

avocadoApp.config(['$routeProvider', '$locationProvider', '$httpProvider',
    function AppConfig($routeProvider, $locationProvider, $httpProvider) {
        $routeProvider.
        when('/', {
            title: 'avocado Home',
            templateUrl: 'views/main.html',
            controller: 'MainCtrl'    
        }).
        when('/customers/', {
            title: 'Kundenverwaltung',
            templateUrl: 'views/customers.html',
            controller: 'CustomersCtrl'
        }).
        when('/customers/:customer_id', {
            title: 'Kunde - Detail',
            templateUrl: 'views/customer.html',
            controller: 'CustomerCtrl'
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
            $http.defaults.headers.commo.Authorization = 'Token ' + $cookieStore.get('djangotoken');
            $http.defaults.headers.post.Authorization = 'Token ' + $cookieStore.get('djangotoken');
        }
    }]);
