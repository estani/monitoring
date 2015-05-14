
/* App Module */
define(['jquery',
        'angular',
        'ngRoute',
        'ngResource',
        'app/config',
        'app/filters/utils',
        'app/providers/host',
        'app/dashboard/dashboard',
        'app/host/hostDrtv',
        'app/host/serviceDrtv'], 
        function (jquery, angular, ngRoute, ngResource, 
            config, filterUtils,
            hostProviderFactory, dashboard, 
            hostDrtv, serviceDrtv) {
    'use strict';

    var monitoring = angular.module('monitoring', ['ngRoute', 'ngResource'])
        .config(config)
        .factory('hostProviderFactory', hostProviderFactory)
        .directive('monHost', hostDrtv)
        .directive('monHostService', serviceDrtv)
        .controller('DashboardCtrl', dashboard);
    
    //register utility filters
    for(var name in filterUtils) {
        var fullName = 'utils_' + name;
        console.debug('registering: %s', fullName);
        monitoring.filter(fullName, function(){ return filterUtils[name]});
    }
    return monitoring;
});
