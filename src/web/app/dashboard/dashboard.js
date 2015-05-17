define([], function() {
    'use strict';
    function DashboardCtrl($scope, hostProvider, userProvider) {
        $scope.hosts = [];
        //to be extracted
        $scope.environments = 'Build BuildS BuildX PreProd'.split(' ');
        
        $scope.$watch('environment', function(newVal, oldVal) {
            if (newVal === undefined) 
                $scope.environment = $scope.environment || userProvider.getPreference('environment', 'build');
            else if (newVal !== oldVal) {
                hostProvider.findByEnvironment($scope.environment).then(function(hosts){
                    $scope.hosts = hosts;
                }, function(){
                    $scope.hosts = []
                });
                userProvider.setPreference('environment', newVal);
            }
        });
    };
    DashboardCtrl.$inject = ['$scope', 'hostProviderFactory', 'userProviderFactory'];
    return DashboardCtrl;
});
