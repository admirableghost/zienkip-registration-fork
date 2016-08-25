var app = angular.module('menu-inventory', []);

app.service('inventory_service',function(){
    this.inventoryList = null;
});