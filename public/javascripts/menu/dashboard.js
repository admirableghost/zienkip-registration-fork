var app = angular.module('kipenzi-dashboard', []);

app.controller('dashboardController', function($scope, $rootScope, $http, dashboardFactory) {
    
    $rootScope.bodyClass = "nav-md";
    
    $scope.menuClick = function(caller) {
        if(caller && caller.menu) {
            $rootScope.go(caller.menu.state)
        }
    };
    
    $scope.getMenus = function(menus) {
        
        if(!menus) {
            $http({
                method: "POST",
                url: window.location.origin + "/static/menus",
                data: {
                    type: sessionStorage.getItem('kipenzi-user').type,
                    role: sessionStorage.getItem('kipenzi-user').role
                }

            }).then(function(response) {
                $scope.menus = response.data.menus;
            }, function(error) {
                console.log(error);
            })
        }
        
    };

    $scope.menus = $scope.getMenus($scope.menus);
        
//    angular.element(document).ready(function(){
//        onReady();
//    });
    
});




app.factory('dashboardFactory', function ($http, userService) {
        
    var dashFunc = {};

    dashFunc.getMenus = function(menus) {
        
        if(!menus) {
            $http({
                method: "POST",
                url: window.location.origin + "/static/menu",
                data: {
                    type: userService.user.type,
                    role: userService.user.role
                }

            }).then(function(response) {
                console.log(response);
                userService.menus =  [{name: "Home", state: "menu.home", class: "fa fa-home", submenu:[]}, 
                    {name: "Inventory", state: "menu.inventory", class: "fa fa-desktop", label: "Coming soon", submenu:[]}, 
                    {name: "Calendar", state: "menu.calendar", class: "fa fa-table", submenu:[]}
                  ];
            }, function(error) {
                console.log(error);
                userService.menus = [{name: "Home", state: "menu.home", class: "fa fa-home", submenu:[]}, 
                    {name: "Inventory", state: "menu.inventory", class: "fa fa-desktop", label: "Coming soon", submenu:[]}, 
                    {name: "Calendar", state: "menu.calendar", class: "fa fa-table", submenu:[]}
                  ];
            })
        }
        
    };
    
    return dashFunc;
});