// Module for Calendar

var app = angular.module('menu-calendar', []);

app.service('calendarService',function(){
    this.eventList = null;
});

app.controller('calendarController', function($scope, $http, $state) {
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
