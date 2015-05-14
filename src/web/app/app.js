
/* App Module */
define(['jquery',
        'jsplumb',
        'angular',
        'ngRoute',
        'ngResource',
        'app/config',
        'app/filters/utils',
        'app/providers/host',
        'app/dashboard/dashboard',
        'app/host/hostDrtv',
        'app/host/serviceDrtv'], 
        function (jquery, jsplumb, angular, ngRoute, ngResource, 
            config, filterUtils,
            hostProviderFactory, dashboard, 
            hostDrtv, serviceDrtv) {
    'use strict';

    var monitoring = angular.module('monitoring', ['ngRoute', 'ngResource'])
        .config(config)
        .factory('hostProviderFactory', hostProviderFactory)
        .directive('monHost', hostDrtv)
        .directive('monHostService', serviceDrtv)
        .directive('monServiceDetailDyn', function () {
              return {
                    template:'<ng-include src="template"/>',
                    restrict: 'E',
                    link: function postLink(scope) {
                          scope.template = 'app/host/services/'+scope.service.type+'_tpl.html';
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
