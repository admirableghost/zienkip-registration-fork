var app = angular.module('menu-calendar', []);

app.service('calendar_service',function(){
    this.eventList = null;
});