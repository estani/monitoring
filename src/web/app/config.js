define([],function(){
    function config($routeProvider) {
      
        $routeProvider
            .when('/dashboard', {
                templateUrl: 'app/dashboard/dashboard_tpl.html', 
                controller: 'DashboardCtrl'
            })
            .when('/details/:id',{
                templateUrl:'templates/ideaDetails.html', 
                controller:'ideaDetailsController'
            })
            .otherwise({
                redirectTo: '/dashboard'
        });
    }
  
    config.$inject=['$routeProvider'];
 
    return config;
});
