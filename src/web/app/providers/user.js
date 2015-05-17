define([], function() {
    'use strict';
    
    function init($cookies) {
        var isStorageSupported = function() {
            try {
                return 'localStorage' in window && window['localStorage'] !== null;
            } catch (e) {
                return false;
            }
        }();

        return {
            getPreference: function (key, default_value) {
                var value;
                if (isStorageSupported) {
                    value = localStorage.getItem(key);
                } else {
                    value = $cookies['local_'+key];
                }
                return value !== undefined ? value : default_value;
            },
            setPreference: function(key, value) {
                if (isStorageSupported) {
                    localStorage.setItem(key, value);
                } else {
                    $cookies['local_'+key] = value;
                }
            }
        };
    };

    init.$inject = ['$cookies'];

    return init;
});
