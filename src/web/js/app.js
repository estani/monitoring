'use strict';

/* App Module */

var monitoring = angular.module('monitoring', [
  'ngRoute',
]);

monitoring.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/dashboard', {
        templateUrl: 'partials/dashboard.html'//,        controller: 'PhoneListCtrl'
      }).
      when('/host/:hostId', {
        templateUrl: 'partials/host-detail.html'
        //controller: 'PhoneDetailCtrl'
      }).
      otherwise({
        redirectTo: '/dashboard'
      });
  }]);
