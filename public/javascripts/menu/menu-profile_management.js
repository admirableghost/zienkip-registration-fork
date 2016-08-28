'use strict';

var app = angular.module('menu-profile_management', ['ui.router', 'menu-calendar']);

app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    
    $stateProvider

//        .state('menu.profilestep1', {
//            url:'/ProfileManagement_Step1',
//            templateUrl:"../views/menu/Profile_Management_1.html",
//            controller: 'profile_management_controller'
//        })
//
//        .state('menu.profilestep2', {
//            url:'/ProfileManagement_Step2',
//            templateUrl:"../views/menu/Profile_Management_2.html",
//            controller: 'profile_management_controller'
//        })
//
//        .state('menu.profilestep3', {
//            url:'/ProfileManagement_Step3',
//            templateUrl:"../views/menu/Profile_Management_3.html",
//            controller: 'calendar_controller'
//        })
//
//        .state('menu.profilestep4', {
//            url:'/ProfileManagement_Step4',
//            templateUrl:"../views/menu/Profile_Management_4.html",
//            controller: 'profile_management_controller'
//        })
    
        .state('menu.profilemanagement.step1', {
            url:'/ProfileManagement_Step1',
            templateUrl:"../../views/menu/Profile_Management_1.html",
            controller: 'profile_management_controller'
        }) 
    
        .state('menu.profilemanagement.step2', {
            url:'/ProfileManagement_Step2',
            templateUrl:"../../views/menu/Profile_Management_2.html",
            controller: 'profile_management_controller'
        }) 
    
        .state('menu.profilemanagement.step3', {
                url:'/ProfileManagement_Step3',
                templateUrl:"../../views/menu/Profile_Management_3.html",
                controller: 'calendar_controller'
            }) 

        .state('menu.profilemanagement.step4', {
                url:'/ProfileManagement_Step4',
                templateUrl:"../../views/menu/Profile_Management_4.html",
                controller: 'profile_management_controller'
            }) 
            
});


app.service('profile_management_service',function(){
    
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
    
//    $scope.gotoStep1 = function() {
//        $state.go('profilestep1');
//    }
//    
//    $scope.gotoStep2 = function() {
//        $state.go('profilestep2');
//    }
//    
//    $scope.gotoStep3 = function() {
//        $state.go('profilestep3');
//    }
//    
//    $scope.gotoStep4 = function() {
//        $state.go('profilestep4');
//    }
    
    $scope.gotoStep1 = function() {
        $state.go('menu.profilemanagement.step1');
    }
    
    $scope.gotoStep2 = function() {
        $state.go('menu.profilemanagement.step2');
    }
    
    $scope.gotoStep3 = function() {
        $state.go('menu.profilemanagement.step3');
    }
    
    $scope.gotoStep4 = function() {
        $state.go('menu.profilemanagement.step4');
    }
    
});

