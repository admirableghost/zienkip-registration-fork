// Module for Appointment History

var app = angular.module('menu-appointment-history', []);

app.service('appointmentHistoryService',function(){
    this.appointmentList = null;
});

app.controller('appointmentHistoryController', function($scope, $http, $state) {
    
});