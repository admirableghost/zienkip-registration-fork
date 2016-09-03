// Module for Dahsboard

var app = angular.module('kipenzi-dashboard', []);

app.controller('dashboardController', function($scope, $rootScope, $http, userService) {
    
    $rootScope.bodyClass = "nav-md";
    
    $scope.menuClick = function(caller) {
        if(caller) {
            if(caller.submenu) {
                $rootScope.go(caller.submenu.state)
            } else if(caller.menu) { 
                if (!caller.menu.submenu || caller.menu.submenu && caller.menu.submenu.length == 0) {
                    $rootScope.go(caller.menu.state)
                } else {
                    //expand menus to show submenus
                }
            }
        }
    };

    $scope.menus = userService.menus;
        
    angular.element(document).ready(function(){
        onReady();
    });
    
});