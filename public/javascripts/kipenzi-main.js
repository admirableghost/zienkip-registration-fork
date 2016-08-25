'use strict';

var app = angular.module('kipenzi-bro', ['kipenzi-router', 'kipenzi-login', 'kipenzi-dashboard',
                                         'menu-home', 'menu-appointment', 'menu-appointment_history', 'menu-calendar', 'menu-inventory', 'menu-profile_management']);

app.service('userService', function() {        
    this.sub = null;
    this.user = null;
    this.profilePic = null;
})


var localcustomer = {
    firstname      : "First",
    lastname       : "Last",
    mobilenumber   : "9655507966",
    gender         : "M",
    petInfo        : [
        {
            "name"      : "Tommy",
            "gender"    : "M",
            "type"      : "Dog",
            "breed"     : "Pug",
            "age"       : "4weeks",
            "history"   : [{"sickness" : "Fever", "treatment" : "Vaccine", "appointmentDate" : "12Jan2016"},
                           {"sickness" : "Cold", "treatment" : "Vaccine", "appointmentDate" : "12Mar2016"}]
        },
        {
            "name"      : "Giggles",
            "gender"    : "M",
            "type"      : "Dog",
            "breed"     : "Pug",
            "age"       : "4weeks",
            "history"   : [{"sickness" : "Fever", "treatment" : "Vaccine", "appointmentDate" : "12Jan2016"},
                           {"sickness" : "Cold", "treatment" : "Vaccine", "appointmentDate" : "12May2016"}]
        },
        {
            "name"      : "Hamster",
            "gender"    : "M",
            "type"      : "Dog",
            "breed"     : "Pug",
            "age"       : "4weeks",
            "history"   : [{"sickness" : "Fever", "treatment" : "Vaccine", "appointmentDate" : "12Jan2016"},
                           {"sickness" : "Cold", "treatment" : "Vaccine", "appointmentDate" : "12Jun2016"}]
        }    
    ]
};



// List of  Customer
app.service('customer_list_service', function() { 
   this.customerList = new ArrayList();
   //this.customerList.push(localcustomer);
   this.customerList.add(localcustomer);
});

// Menu - Home Screen (or) Dashboard
app.controller('home_controller', function($scope, $rootScope, $http, $state) {   
    $rootScope.bodyClass = "nav-md";
});

// Menu - Appointment History
app.controller('appointment_history_controller', function($scope, $http, $state) {
    
});

// Menu - Appointments
app.controller('appointment_controller', function($scope, $http, $state) {
    $scope.profile_management_controller_firstName = "Dr. Irfan";
    $scope.profile_management_controller_lastName = "Khan";
    $scope.profile_management_controller_mobileNumber = "Farhan";
    $scope.profile_management_controller_eMail = "irfan@gmail.com";
    $scope.profile_management_controller_gender = "male";
});

// Menu - Calendar
app.controller('calendar_controller', function($scope, $http, $state) {
   
});

// Menu - Profile Managenment
app.controller('profile_management_controller', function($scope, $http, $state) {
    $scope.profile_management_controller_FirstName = "Dr. Irfan";
    $scope.profile_management_controller_LastName = "Khan";
    $scope.profile_management_controller_MobileNumber = "Farhan";
    $scope.profile_management_controller_EMail = "irfan@gmail.com";
    $scope.profile_management_controller_Gender = "male";
    $scope.profile_management_controller_DOB_Date = "2";
    $scope.profile_management_controller_DOB_Month = "May";
    $scope.profile_management_controller_DOB_Year = "1990";
    $scope.profile_management_controller_ClinicName = "AK Vet CLinic";
    $scope.profile_management_controller_Clinic_FromTime = "10am";
    $scope.profile_management_controller_Clinic_ToTime = "7pm";
    $scope.profile_management_controller_AvgConsultDuration = "30 mins";
    $scope.profile_management_controller_ConsultationFees = "150";
    $scope.profile_management_controller_Experience_Value = 2;
    $scope.profile_management_controller_Experience_Duration = "years";
    $scope.profile_management_controller_Specialization = "Dogs";
    $scope.profile_management_controller_Qualifications = "MD";
    $scope.profile_management_controller_SelfDescription = "Professional with established reputation";
});

// Menu - Inventory Management
app.controller('inventory_controller', function($scope, $http, $state) {
   
});

app.factory('sessionInjector', ['userService', function(userService, $rootScope) {
        
    var sessionInjector = {
        request: function(config) {
            config.headers.Authorization = 'Bearer ' + window.localStorage.getItem('kipenzi-token');
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

app.run(function($http, $rootScope, $state) {
    
    $rootScope.go = function(state) {
        if(state) {
            $state.go(state);
        }
    };
    
    $state.go('menu.home');

//    $http.get(...).success(function(response) {
//        $rootScope.somedata = response;
//    }
}) ;

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