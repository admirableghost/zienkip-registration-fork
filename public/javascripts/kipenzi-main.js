'use strict';

var app = angular.module('kipenzi-bro', ['kipenzi-router', 'kipenzi-login', 'kipenzi-dashboard',
                                         'menu-home', 'menu-appointment-register', 'menu-appointment-history', 'menu-calendar', 'menu-inventory', 'menu-profile_management']);

app.service('userService', function(kipenziFactory) {        
    
    var token = window.sessionStorage.getItem('kipenzi-token');
    
    if (token) {
        kipenziFactory.loadUserService(this, token);
    }
    
})

app.run(function($http, $rootScope, $state) {
    
    $rootScope.go = function(state) {
        if(state) {
            $state.go(state);
        }
    };
    
    $state.go('menu.home');

}) ;

app.factory('sessionInjector', ['userService', function(userService, $rootScope) {
        
    var sessionInjector = {
        request: function(config) {
            config.headers.Authorization = 'Bearer ' + userService.token;
            return config;
        },
       responseError: function (response) {
           if (response.status === 401) {
               $rootScope.go('login');
           }     
       }
    };
    return sessionInjector;    
    
}]);

app.factory('kipenziFactory', function() {
        
    var fac = {};
    
    fac.loadUserService = function (service, token) {
        
        var payload = JSON.parse(window.atob(token.split(".")[1]));
                
        service.token   = token;
        service.sub     = payload.sub;
        service.menus   = payload.menus;
    };
    
    return fac;    
    
});

app.config(['$httpProvider','$authProvider', function($httpProvider,$authProvider) {
        $httpProvider.interceptors.push('sessionInjector');
//           $authProvider.storageType = 'sessionStorage';

//        $authProvider.facebook({
//            name: 'facebook',
//            url: window.location.origin + '/getLoginPage/',
//            authorizationEndpoint: 'https://www.facebook.com/v2.0/dialog/oauth',
//            redirectUri: window.location.origin + '/getLoginPage/',
//            requiredUrlParams: ['display', 'scope'],
//            scope: ['email'],
//            scopeDelimiter: ',',
//            display: 'popup',
//            type: '2.5',
//            responseType: 'token',
//            clientId: '230341484018105',
//            popupOptions: {
//                width: 580,
//                height: 400
//            }
//        });
    }]);
