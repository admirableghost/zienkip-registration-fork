var app = angular.module('menu-appointment-register', ['toggle-switch']);

app.service('appointment_service',function(){
    this.appointmentList = null;
});

// Menu - Appointments
app.controller('appointmentRegisterController', function($http, $scope) {
    
    $scope.appointment  = {};
    
    $scope.appointment.token = "";
    
    $scope.appointment.user = {};
    $scope.appointment.user.fname   = "";
    $scope.appointment.user.lname   = "";
    $scope.appointment.user.mobile  = "";
    $scope.appointment.user.gender  = true;
    
    $scope.appointment.kipenzis     = [{name: "Kip1"}, {name: "Kip2"}, {name: "Kip3"}];
    
    $scope.appointment.time_slot    = "";
    
    $scope.selected_kipenzi = $scope.appointment.kipenzis[0];
    
    $scope.selectKipenzi = function (caller) {
        $scope.selected_kipenzi = $scope.appointment.kipenzis[caller.$index];
    }
    
    $scope.checkMobile = function() {
        alert($scope.appointment.user.fname + " : " + $scope.appointment.user.lname  + " : " + $scope.appointment.user.mobile  + " : " + $scope.appointment.user.gender);
    }
    
    $scope.bookAppointment = function() {
        
        $http({
                method: "POST",
                url: window.location.origin + "/api/appointment",
                data: {
                    appointment: $scope.appointment
                }

            }).then(function(response) {
                alert(response.data.token)
                $scope.appointment.token = response.data.token;
                
            }, function(response) {
                alert(response);
            });
        
    }
    
});