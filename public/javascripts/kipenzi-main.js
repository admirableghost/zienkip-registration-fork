'use strict';

var app = angular.module('kipenzi-bro', ['kipenzi-router', 'kipenzi-login', 'kipenzi-dashboard',
                                         'menu-home', 'menu-appointment-register', 'menu-appointment-history', 'menu-calendar', 'menu-inventory', 'menu-profile_management']);

// Holds the user details
// On page reload will take the session storage contents and load it to avoid losing data
app.service('userService', function(kipenziFactory) {        
    
    var token = window.sessionStorage.getItem('kipenzi-token');
    
    if (token) {
        kipenziFactory.loadUserService(this, token);
    }
    
})

// called when app gets loaded
app.run(function($http, $rootScope, $state) {
    
    // call this method to route to anywhere in the app
    $rootScope.go = function(state) {
        if(state) {
            $state.go(state);
        }
    };
    
    $state.go('menu.home');

}) ;

// factory which has the auth token injector defined
app.factory('sessionInjector', ['userService', function(userService, $rootScope) {
        
    var sessionInjector = {
        request: function(config) {
            config.headers.Authorization = 'Bearer ' + userService.token;
            return config;
        }
//            ,responseError: function (response) {
//           if (response.status === 401) {
//               $rootScope.go('login');
//           }     
//       }
    };
    return sessionInjector;    
    
}]);

// Add all the necessary app level factory components
app.factory('kipenziFactory', function() {
        
    var fac = {};
    
    // Loads the userService from the token passed (can be from sessionStorage or post login)
    fac.loadUserService = function (service, token) {
        
        var payload = JSON.parse(window.atob(token.split(".")[1]));
                
        service.token   = token;
        service.sub     = payload.sub;
        service.menus   = payload.menus;
    };
    
    return fac;    
    
});

// app level config to modify and providers
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
