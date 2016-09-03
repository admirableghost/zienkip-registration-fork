// Module for Appointment Registration

var app = angular.module('menu-appointment-register', []);

app.service('appointmentRegisterService',function(){
    this.appointmentList = null;
});

app.controller('appointmentRegisterController', function($scope, $http, $state) {
    $scope.profile_management_controller_firstName = "Dr. Irfan";
    $scope.profile_management_controller_lastName = "Khan";
    $scope.profile_management_controller_mobileNumber = "Farhan";
    $scope.profile_management_controller_eMail = "irfan@gmail.com";
    $scope.profile_management_controller_gender = "male";
});