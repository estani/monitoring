define([], function(){
    'use strict';

    function felixProviderFactory($http, $resource) {
        var all = $resource('/rest/services/:environment/:host/felix');
        var logLevel = 'DEBUG';

        return {
        
        };
    };
    felixProviderFactory.$inject = ['$http', '$resource'];
    return felixProviderFactory;
});
