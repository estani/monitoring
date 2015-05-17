define([], function(){
    'use strict';

    function hostProviderFactory($http, $resource) {
        var all = $resource('/rest/hosts/:environment/:host');
        var logLevel = 'DEBUG';
        return {
            setLogLevel: function(value) {
                if (value) {
                    var key = value.toString().toUpperCase();
                    switch (key) {
                        case 'NONE':
                        case 'OFF':
                        case 'NULL':
                            logLevel = null;
                            break;
                        default:
                            logLevel = key;
                    }
                }
            },
            find: function(environment, id) {
                return all.get({environment:environment, id:id}).$promise;
            },
            findByEnvironment: function(environment) {
                if (logLevel) console.log('Calling %s', environment);
                return all.query({environment:environment}).$promise;
            }
        };
    };

    hostProviderFactory.$inject = ['$http', '$resource'];
    return hostProviderFactory;
});
