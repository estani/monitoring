define([], function(){
    'use strict';

    function hostProviderFactory($http, $resource) {
        var single = $resource('/rest/host/:id');
        var all = $resource('/rest/hosts');

        function getHost(url) {
            console.log('calling: %s', url);
        }
        return {
            find: function(id) {
                return single.get({id:id});
            },
            findAll: function() {
                return all.query().$promise;
            }
        };
    };

    hostProviderFactory.$inject = ['$http', '$resource'];
    return hostProviderFactory;
});
