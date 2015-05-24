require.config({
    baseUrl: '.',
    paths: {
        //libs
        angular: 'angular/angular',
        ngRoute: 'angular-route/angular-route',
        ngResource: 'angular-resource/angular-resource',
        ngCookies: 'angular-cookies/angular-cookies',
        angularMocks: 'angular-mocks/angular-mocks',
        jquery: 'jquery/dist/jquery',
        jqueryUi: 'jquery-ui/jquery-ui',
        jsplumb: 'jsplumb/dist/js/jquery.jsPlumb-1.7.5'
    },
    shim: {
        'angular' : {'exports' : 'angular'},
        'ngRoute': ['angular'],
        'ngResource': ['angular'],
        'ngCookies': ['angular'],
        'angularMocks': {
            deps:['angular'],
            'exports':'angular.mock'
        }
    },
    priority: [
        "angular"
    ],
    deps: window.__karma__ ? allTestFiles : [],
    callback: window.__karma__ ? window.__karma__.start : null,
    baseUrl: window.__karma__ ? '/base/app' : '',
});

requirejs(['angular', 'app/app'], function(angular, app){
    angular.bootstrap(document, ['monitoring']);
});
