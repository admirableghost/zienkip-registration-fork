var app = angular.module('menu-inventory-history',['smart-table']);    
   
app.factory('inventoryHistoryFactory', function() {

	var inventoryEntries = [];
	
	return {
		
		updateLiveFeedData : function(liveItem) {
			inventoryEntries.push(liveItem);
		},
		
		getTableData : function () {
			return inventoryEntries;
		}
		
	}
});
 	   
app.controller('inventoryHistoryController', function ($scope, inventoryHistoryFactory) {
	$scope.inventoryEntries = inventoryHistoryFactory.getTableData();
});
