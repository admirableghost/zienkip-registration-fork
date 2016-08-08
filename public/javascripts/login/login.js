var app = angular.module('kipenzi-login', ['satellizer', 'ngAnimate']);

app.controller('loginController', function($scope, $rootScope, $http, $state, $auth) {
        
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
                window.sessionStorage.setItem('kipenzi-token', response.data.token);
                $state.go('menu.home');
            }, function(response, error) {
                console.log("Error message " + response + ' :::::: ' +error);
            });

        }
 
});