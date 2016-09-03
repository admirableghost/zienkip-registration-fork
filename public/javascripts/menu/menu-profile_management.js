// Module for Doctor(s) Profile Management

'use strict';

var app = angular.module('menu-profile_management', ['ui.router', 'menu-calendar']);

app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    
    $stateProvider

        .state('menu.profile_management.step1', {
            url:'/ProfileManagement_Step1',
            templateUrl:"../../views/menu/menu-profile_management-step1.html",
            controller: 'profile_management_controller'
        }) 
    
        .state('menu.profile_management.step2', {
            url:'/ProfileManagement_Step2',
            templateUrl:"../../views/menu/menu-profile_management-step2.html",
            controller: 'profile_management_controller'
        }) 
    
        .state('menu.profile_management.step3', {
            url:'/ProfileManagement_Step3',
            templateUrl:"../../views/menu/menu-profile_management-step3.html",
            controller: 'calendar_controller'
        }) 

        .state('menu.profile_management.step4', {
            url:'/ProfileManagement_Step4',
            templateUrl:"../../views/menu/menu-profile_management-step4.html",
            controller: 'profile_management_controller'
        }) 
            
});


app.service('profileManagementService',function(){
    
});

app.controller('profileManagementController', function($scope, $http, $state) {
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
    
    $scope.gotoStep1 = function() {
        $state.go('menu.profile_management.step1');
    }
    
    $scope.gotoStep2 = function() {
        $state.go('menu.profile_management.step2');
    }
    
    $scope.gotoStep3 = function() {
        $state.go('menu.profile_management.step3');
    }
    
    $scope.gotoStep4 = function() {
        $state.go('menu.profile_management.step4');
    }
    
});

