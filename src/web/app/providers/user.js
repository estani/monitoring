define([], function() {
    'use strict';
    
    function init($cookies) {

        console.log($cookies);
        return {
            getPreference: function (key, default_value) {
                var value = $cookies[key];
                return value !== undefined ? value : default_value;
            },
            setPreference: function(key, value) {
                $cookies[key] = value;
            }
        };
    };

    init.$inject = ['$cookies'];

    return init;
});
