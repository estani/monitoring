define([], function() {
    'use strict'
    function init(felix) {
        return {
            scope: {host: '='},
            templateUrl: 'app/host/services/felix_tpl.html',
            link: function (scope, elem, attrs) {
                console.log(scope);
            }
        }
    };
    init.$injector = ['felix'];
    return init;
});
