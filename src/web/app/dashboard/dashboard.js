define([], function() {
    'use strict';
    function DashboardCtrl($scope, $timeout, host, user, connector) {
        
        
        //to be extracted
        $scope.environments = 'Build BuildS BuildX PreProd'.split(' ');


        var updateHosts = function() {
            host.findByEnvironment($scope.environment).then(function(hostsResp){
                //prepare them
                var hosts = [];
                hostsResp.forEach(function(host){
                    host.id = host.ip.replace(/\./g, '_');
                    hosts.push(host);
                    host.services.forEach(function(service) {
                        service.id = host.id + '-' + service.port;
                        if (service.uses) {
                            service.uses.forEach(function(uses) {
                                uses.id = uses.host.replace(/\./g, '_') + '-' + uses.port;
                            });
                        }
                    });
                });
                $scope.hosts = hosts;
                $scope.hostsDisplay = user.getPreference('hostsDisplay-'+$scope.environment, {});
                
                $timeout(function(){
                    connector.init( $scope.hostsDashboardId, $scope.hosts, $scope.hostsDisplay);
                }, 200);
            }, function(){
                $scope.hosts = [];
            });
        };

        $scope.$watch('environment', function(newVal, oldVal) {
            if (newVal !== oldVal) {
                if (oldVal) {
                    user.setPreference('hostsDisplay-'+oldVal, $scope.hostsDisplay);
                }
                user.setPreference('environment', newVal);
                updateHosts();
            }
        });

        //init
        $scope.hostsDashboardId = 'hostsDashboard';
        $scope.hosts = [];
        $scope.environment = user.getPreference('environment', 'build');
        $scope.hostsDisplay = user.getPreference('hostsDisplay-build', {});
        updateHosts();
        
        connector.onChange(function(e){
            //store user state
            user.setPreference('hostsDisplay-'+$scope.environment, $scope.hostsDisplay);
        });

    };
    DashboardCtrl.$inject = ['$scope', '$timeout', 'host', 'user', 'connector'];
    return DashboardCtrl;
});
