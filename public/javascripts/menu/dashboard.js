var app = angular.module('kipenzi-dashboard', []);

app.controller('dashboardController', function($scope, $rootScope, $http, userService) {
    
    $rootScope.bodyClass = "nav-md";
    
    $scope.menuClick = function(caller) {
        if(caller && caller.menu) {
            $rootScope.go(caller.menu.state)
        }
    };

    $scope.menus = userService.menus;
        
//    angular.element(document).ready(function(){
//        onReady();
//    });
    
});