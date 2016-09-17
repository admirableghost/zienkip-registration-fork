// Module for Dahsboard

var app = angular.module('kipenzi-dashboard', []);

app.controller('dashboardController', function($scope, $rootScope, $http, userService, $state) {
    
    $rootScope.bodyClass = "nav-md";
    
    $scope.menuClick = function(caller) {
        if(caller) {
            
            $rootScope.currentMenu = caller.menu.state;
            if(caller.submenu) {
                // registers click if it is a submenu
                $rootScope.submenus = caller.menu.submenus;
                $rootScope.go(caller.submenu.state)
            } else if(caller.menu) { 
//                if (!caller.menu.submenu || caller.menu.submenu && caller.menu.submenu.length == 0) {
                    // if a menu without submenus register the click 
                    $rootScope.submenus = caller.menu.submenus;
                    $rootScope.go(caller.menu.state)
//                } else {
                    // expand menus to show submenus
//                    caller.$mdOpenMenu();
//                }
            }
        }
    };

    $scope.menus            = userService.menus;
        
});