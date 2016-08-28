var app = angular.module('kipenzi-login', ['satellizer']);

app.controller('loginController', function($scope, $rootScope, $http, $state, userService, kipenziFactory) {
        
//                        <button ng-click="facebookauth()">SignInFacebook</button>
//                        <button ng-click="authFlow()">Get User</button>
//                        <button ng-click="logOut()">LogOut</button>
//                        <button ng-click="facebookauth('facebook')">Facebook</button>
    
        $rootScope.bodyClass = "login";
        
        // native login method
        $scope.login = function() {

            $http({
                method: "POST",
                url: window.location.origin + "/login",
                data: {
                    username: $scope.username,
                    password: $scope.password
                }

            }).then(function(response) {
//                var payload = JSON.parse(window.atob(response.data.token.split(".")[1]));
//                
//                userService.token = response.data.token;
//                userService.sub = payload.sub;
//                userService.menus = payload.menus;
                
                kipenziFactory.loadUserService(userService, response.data.token);
                
                window.sessionStorage.setItem('kipenzi-token', JSON.stringify(userService.token));
                
                $state.go('menu.home');
            }, function(response, error) {
                console.log("Error message " + response + ' :::::: ' +error);
            });

        }
 
});