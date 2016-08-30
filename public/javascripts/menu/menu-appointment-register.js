var app = angular.module('menu-appointment', []);

app.service('appointment_service',function(){
    this.appointmentList = null;
});