var app = angular.module('menu-appointment-register', []);

app.service('appointment_service',function(){
    this.appointmentList = null;
});

// Menu - Appointments
app.controller('appointmentRegisterController', function($http, $scope, userService) {
    
    $scope.appointment  = {};
    
    $scope.appointment.token        = "";
    $scope.appointment.user         = new userVO();
    $scope.appointment.kipenzis     = [new kipenziVO()];
    $scope.appointment.time_slot    = "";
    $scope.appointment.service_provider = userService.sub;
    
    $scope.selected_kipenzi_index   = 0;
    $scope.selected_kipenzi         = $scope.appointment.kipenzis[$scope.selected_kipenzi_index];
    
    $scope.selectKipenzi = function (caller) {
        $scope.selected_kipenzi         = $scope.appointment.kipenzis[caller.$index];
        $scope.selected_kipenzi_index   = caller.$index;
    }
    
    $scope.addKipenzi = function() {
        $scope.appointment.kipenzis.push(new kipenziVO());
        $scope.selected_kipenzi = $scope.appointment.kipenzis[$scope.appointment.kipenzis.length-1];
    }
    
    $scope.removeKipenzi = function (caller) {
        if($scope.appointment.kipenzis.length > 1) {
            $scope.appointment.kipenzis.splice($scope.selected_kipenzi_index, 1);
            
            if($scope.selected_kipenzi_index > 0) {
                $scope.selected_kipenzi_index = $scope.selected_kipenzi_index -1;
            }
            $scope.selected_kipenzi = $scope.appointment.kipenzis[$scope.selected_kipenzi_index];   
        } else {
            alert("You can't remove all the kipenzis");
        }
    }
    
    $scope.checkMobile = function() {
        $http({
                method: "POST",
                url: window.location.origin + "/api/getUserAndPetDetails",
                data: {
                    appointment: $scope.appointment
                }

            }).then(function(response) {
                $scope.appointment.user     = new userVO(response.data.user)    || new userVO();
            
                var kipenzis = [];
                for (var k_id in response.data.kipenzis) {
                    kipenzis.push(new kipenziVO(response.data.kipenzis[k_id]));
                }
                if(kipenzis.length == 0) {
                    kipenzis = $scope.appointment.kipenzis;
                }
            
                $scope.appointment.kipenzis = kipenzis;
            
                $scope.selected_kipenzi     = $scope.appointment.kipenzis[0];
                
            }, function(response) {
                alert(response);
            });
        
    }
    
    $scope.bookAppointment = function(forms) {
        
        var kipenzis = [];
        
        for(var index in $scope.appointment.kipenzis) {
            if($scope.appointment.kipenzis[index].needAppointment) {
                kipenzis.push($scope.appointment.kipenzis[index]);  
            }
        }
        
        $http({
                method: "POST",
                url: window.location.origin + "/api/appointment",
                data: {
                    appointment: new appointmentVO($scope.appointment.user, kipenzis, $scope.appointment.time_slot)
                }

            }).then(function(response) {
                alert(response.data.token)
                $scope.appointment.token = response.data.token;
                
            }, function(response) {
                alert(response);
            });
        
    }
    
});