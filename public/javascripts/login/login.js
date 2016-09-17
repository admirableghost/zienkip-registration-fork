var app = angular.module('kipenzi-login', ['satellizer']);

app.controller('loginController', function($scope, $rootScope, $http, $state, userService, kipenziFactory) {
    
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
                
                kipenziFactory.postLogin(userService, response.data.token);
                
                var tokenString = JSON.stringify(userService.token);
                if(tokenString) {
                    window.sessionStorage.setItem('kipenzi-token', tokenString.substring(1, tokenString.length-1));
                }
                
                $state.go('menu.home');
            }, function(response, error) {
                alert(error);
            });

        }
 
});