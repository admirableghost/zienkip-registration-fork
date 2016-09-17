'use strict';

var app = angular.module('kipenzi-bro', [// angular specific
                                         'ngMaterial', 'ngMessages',
    
                                         // vendors
                                         'internationalPhoneNumber', 'toggle-switch',
    
                                         // kipenzi - global
                                         'kipenzi-router', 'kipenzi-directives', 
                                         'kipenzi-login',
                                         'kipenzi-dashboard',
    
                                         // kipenzi - specific
                                         'menu-home',
                                         'menu-appointment', 'menu-appointment-register', 'menu-appointment-history',
                                         'menu-calendar',
                                         'menu-inventory-entry', 'menu-inventory-history',
                                         'menu-profile_management']);

// Holds the user details
// On page reload will take the session storage contents and load it to avoid losing data
app.service('userService', function(kipenziFactory, liveFeedServer) {        
    
    var token = window.sessionStorage.getItem('kipenzi-token');
    
    if (token) {
        kipenziFactory.loadUserService(this, token);
        liveFeedServer.getLiveFeedConnection();
    }
    
})

// Holds the static data required for app to run
app.service('staticData', function() {        
    
})

// called when app gets loaded
app.run(function($http, $rootScope, $state) {
    
    // call this method to route to anywhere in the app
    $rootScope.go = function (state) {
        if(state) {
            $state.go(state);
        }
    };
        
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){ 
        $rootScope.currentState = toState.name;
    });
    
    $rootScope.currentMenu  = "menu.home";
    $rootScope.submenus     = undefined;
    
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
app.config(['$httpProvider','$authProvider', 'ipnConfig', '$mdDateLocaleProvider', function($httpProvider, $authProvider , ipnConfig, $mdDateLocaleProvider) {
    
    ipnConfig.defaultCountry = 'in';
    ipnConfig.preferredCountries = ['in', 'us', 'uk', 'gb'];
    ipnConfig.skipUtilScriptDownload = true;
    ipnConfig.nationalMode=false;
    
    $mdDateLocaleProvider.formatDate = function(date) {
        return date ? moment(date).format('DD-MMM-YYYY') : '';
    };
    
    $mdDateLocaleProvider.parseDate = function(dateString) {
        var m = moment(dateString, 'DD-MMM-YYYY', true);
        return m.isValid() ? m.toDate() : new Date(NaN);
    };
        
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

app.factory('liveFeedServer',function(appointmentHistoryFactory, inventoryHistoryFactory, $interval){
		var liveFeedServer = {
			getLiveFeedConnection : function(){
				var socket = io.connect(window.location.protocol + '//' +  window.location.hostname + ":8701",{ query: "foo=bar&type=admin" });
				socket.on('Event',function(data){
					// DO NOTHING
				});
				socket.on('AppointmentEvent',function(data){
                    alert('Live Event')
                    console.log('Appointment event coming up');
					appointmentHistoryFactory.updateLiveFeedData(data);
				});
				socket.on('InventoryEvent',function(data){
					inventoryHistoryFactory.updateLiveFeedData(data);
				});
			}
		}
		 $interval(function () {
			//	alert('Timer Alert')
        	//$scope.myHeader = "How are you today?";
    	}, 20	);
		return liveFeedServer;
	});
