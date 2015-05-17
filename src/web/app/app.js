
/* App Module */
define(['jquery',
        'jsplumb',
        'angular',
        'ngRoute',
        'ngResource',
        'ngCookies',
        'app/config',
        'app/filters/utils',
        'app/providers/host',
        'app/providers/user',
        'app/dashboard/dashboard',
        'app/host/hostDrtv',
        'app/host/serviceDrtv'], 
        function (jquery, jsplumb, angular, 
            ngRoute, ngResource, ngCookies,
            config, filterUtils,
            hostProviderFactory, userProviderFactory, dashboard, 
            hostDrtv, serviceDrtv) {
    'use strict';

    var monitoring = angular.module('monitoring', ['ngRoute', 'ngResource', 'ngCookies'])
        .config(config)
        .factory('hostProviderFactory', hostProviderFactory)
        .factory('userProviderFactory', userProviderFactory)
        .directive('monHost', hostDrtv)
        .directive('monHostService', serviceDrtv)
        .directive('monServiceDetailDyn', function () {
              return {
                    template:'<ng-include src="template"/>',
                    restrict: 'E',
                    link: function postLink(scope) {
                        var type = scope.service.type;
                        scope.template = 'app/host/services/dynamic/' + type + '_tpl.html';
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
