define([], function() {
    'use strict';
    function DashboardCtrl($scope, hostProvider) {
        $scope.hosts = [];
        hostProvider.findAll().then(function(hosts){
            $scope.hosts = hosts;
        });

    };
    DashboardCtrl.$inject = ['$scope', 'hostProviderFactory'];
    return DashboardCtrl;
});
