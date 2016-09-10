var app = angular.module('menu-appointment-register', ['toggle-switch']);

app.service('appointment_service',function(){
    this.appointmentList = null;
});

// Menu - Appointments
app.controller('appointmentRegisterController', function($http, $scope) {
    
    $scope.appointment  = {};
    
    $scope.appointment.token        = "";
    $scope.appointment.user         = new userVO();
    $scope.appointment.kipenzis     = [];
    $scope.appointment.time_slot    = "";
    
    $scope.selected_kipenzi = $scope.appointment.kipenzis[0];
    
    $scope.selectKipenzi = function (caller) {
        $scope.selected_kipenzi = $scope.appointment.kipenzis[caller.$index];
    }
    
    $scope.addKipenzi = function() {
        $scope.appointment.kipenzis.push(new kipenziVO());
        $scope.selected_kipenzi = $scope.appointment.kipenzis[$scope.appointment.kipenzis.length-1];
    }
    
    $scope.checkMobile = function() {
        $http({
                method: "POST",
                url: window.location.origin + "/api/getUserAndPetDetails",
                data: {
                    appointment: $scope.appointment
                }

            }).then(function(response) {
                $scope.appointment.user     = response.data.user        || new userVO();
                $scope.appointment.kipenzis = response.data.kipenzis    || [];
                $scope.selected_kipenzi     = $scope.appointment.kipenzis[0];
                
            }, function(response) {
                alert(response);
            });
        
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