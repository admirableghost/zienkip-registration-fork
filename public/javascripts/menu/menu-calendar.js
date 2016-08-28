var app = angular.module('menu-calendar', []);

app.service('calendar_service',function(){
    this.eventList = null;
});

// Menu - Calendar
app.controller('calendar_controller', function($scope, $http, $state) {
    $scope.gotoStep1 = function() {
        $state.go('profilestep1');
    }
    
    $scope.gotoStep2 = function() {
        $state.go('profilestep2');
    }
    
    $scope.gotoStep3 = function() {
        $state.go('profilestep3');
    }
    
    $scope.gotoStep4 = function() {
        $state.go('profilestep4');
    }
});