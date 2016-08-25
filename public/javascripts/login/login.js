var app = angular.module('kipenzi-login', ['satellizer']);

app.controller('loginController', function($scope, $rootScope, $http, $state, userService) {
        
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
                window.localStorage.setItem('kipenzi-token', response.data.token);
                var payload = JSON.parse(window.atob(response.data.token.split(".")[1]));
                userService.sub = payload.sub;
                userService.user = response.data.user;
                window.sessionStorage.setItem('kipenzi-user', response.data.user);
                $state.go('menu.home');
                //------------------- Static page testing - Avvai - 21_Aug_2016
                // * Uncomment the line above the block after removing the block
                //$state.go('staticPage_ProfileManagement');
                //$state.go('staticPage_Appointments');
                //---------------------------------------
            }, function(response, error) {
                console.log("Error message " + response + ' :::::: ' +error);
            });

        }
 
});