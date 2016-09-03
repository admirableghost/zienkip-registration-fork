// Module for Inventory

var app = angular.module('menu-inventory', []);

app.service('inventoryService',function(){
    this.inventoryList = null;
});

app.controller('inventoryController', function($scope, $http, $state) {
   
});