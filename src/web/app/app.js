
/* App Module */
define(['jquery',
        'jqueryUi',
        'jsplumb',
        'angular',
        'ngRoute',
        'ngResource',
        'ngCookies',
        'app/config',
        'app/filters/utils',
        'app/graphics/connector',
        'app/providers/host',
        'app/providers/user',
        'app/providers/felix',
        'app/dashboard/dashboard',
        'app/host/hostDrtv',
        'app/host/serviceDrtv',
        'app/host/services/felixDrtv'], 
        function (jquery, jqueryUi, jsplumb, angular, 
            ngRoute, ngResource, ngCookies,
            config, filterUtils, connectorFactory,
            hostProviderFactory, userProviderFactory, felixProviderFactory,
            dashboard, 
            hostDrtv, serviceDrtv, felixDrtv) {
    'use strict';

    var monitoring = angular.module('monitoring', ['ngRoute', 'ngResource', 'ngCookies'])
        .config(config)
        .factory('host', hostProviderFactory)
        .factory('user', userProviderFactory)
        .factory('felix', felixProviderFactory)
        .factory('connector', connectorFactory)
        .directive('monHost', hostDrtv)
        .directive('monHostService', serviceDrtv)
        .directive('monFelix', felixDrtv)
        .directive('monDynamic', function () {
              return {
                    template:'<ng-include src="template"/>',
                    restrict: 'E',
                    scope: {
                        type: "@",
                        path: "@",
                        prefix: "@",
                        suffix: "@"
                    },
                    link: function postLink(scope) {
                        var prefix = scope.prefix || "";
                        var suffix = scope.suffix || "_tpl.html";
                        scope.template = scope.path + '/' + prefix + scope.type + suffix;
                    }
              }
        })
        .controller('DashboardCtrl', dashboard);
    
    //register utility filters
    for(var name in filterUtils) {
        var fullName = 'utils_' + name;
        console.debug('registering: %s', fullName);
        monitoring.filter(fullName, function(){ return filterUtils[name]});
    }
    return monitoring;
});
