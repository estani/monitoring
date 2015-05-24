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
                    //be consistent and store undefined if it's not defined. localstorage stores only strings at this time.
                    value = localStorage.getItem(key);
                    if (value === null) value = undefined;
                } else {
                    value = $cookies['local_'+key];
                }
                return value !== undefined ? JSON.parse(value) : default_value;
            },
            setPreference: function(key, value) {
                value = JSON.stringify(value);
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
