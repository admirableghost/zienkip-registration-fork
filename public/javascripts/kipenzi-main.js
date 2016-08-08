'use strict';

var app = angular.module('kipenzi-bro', ['kipenzi-router', 'kipenzi-login', 'kipenzi-home']);

app.service('userService', function() {        

    this.user = null;
});


app.factory('sessionInjector', ['userService', function(userService) {
        
    var sessionInjector = {
        request: function(config) {
            config.headers.Authorization = 'Bearer ' + window.sessionStorage.getItem('kipenzi-token');
            return config;
        }
    };
    return sessionInjector;    
    
}]);

app.run(function($http, $rootScope, $state) {
    
    $rootScope.go = function(state) {
        $state.go(state);
    }
    
//    $http.get(...).success(function(response) {
//        $rootScope.somedata = response;
//    }
});