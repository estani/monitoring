define([], function() {
    'use strict';
    function DashboardCtrl($scope, host, user, connector) {
        $scope.hosts = [];
        //to be extracted
        $scope.environments = 'Build BuildS BuildX PreProd'.split(' ');
        
        $scope.$watch('environment', function(newVal, oldVal) {
            if (newVal === undefined) 
                $scope.environment = $scope.environment || user.getPreference('environment', 'build');
            else if (newVal !== oldVal) {
                host.findByEnvironment($scope.environment).then(function(hosts){
                    $scope.hosts = hosts;
                }, function(){
                    $scope.hosts = []
                });
                user.setPreference('environment', newVal);
            }
        });
    };
    DashboardCtrl.$inject = ['$scope', 'host', 'user', 'connector'];
    return DashboardCtrl;
});
