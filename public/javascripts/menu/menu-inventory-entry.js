var app = angular.module('menu-inventory-entry'
, []);

app.service('inventoryEntryService',function(){
    this.inventoryList = null;
});

app.factory('inventoryEntryFactory', function( ) {
	this.templateInventoryObject = null;
	
	return {
		
		getInventoryToken : function() {
			return (null != templateInventoryObject) ? templateInventoryObject.token : null;
		},
		
		getTemplateInventoryObject : function(){
			return templateInventoryObject;
		},
		
		getInventoryObjectToTransmit : function( inventoryObjectFromScreen ) {
			templateInventoryObject 				= new inventory_VO(inventoryObjectFromScreen.token);
			templateInventoryObject.name			= inventoryObjectFromScreen.name;
			templateInventoryObject.batch			= inventoryObjectFromScreen.batch;
			templateInventoryObject.quantity		= inventoryObjectFromScreen.quantity;
			templateInventoryObject.units			= inventoryObjectFromScreen.units;
			templateInventoryObject.batchid			= inventoryObjectFromScreen.batchid;
			templateInventoryObject.manufacturer	= inventoryObjectFromScreen.manufacturer;
			templateInventoryObject.expiry			= inventoryObjectFromScreen.expiry;
			return templateInventoryObject;
		}
		
	}
	
});

app.controller('inventoryEntryController', function($scope, $http, $state, inventoryEntryFactory) {
	
	$scope.inventory 				= {};
	// $scope.inventory.name 			= "Antibiotic";
	$scope.inventory.manufacturer 	= "gsk";
	$scope.inventory.batchid		= "FD76433";
	$scope.inventory.quantity		= "5";
	$scope.inventory.units			= "boxes";
	$scope.inventory.expiry			= "2018-07-09";
	$scope.inventory.token			= "Inv1";
	
	$scope.saveInventory = function( ) {
		
		var inventoryObjectInTemplateForm = inventoryEntryFactory.getInventoryObjectToTransmit($scope.inventory);
		
		$http({
				method: "POST",
				url: window.location.origin + "/api/inventory",
				data: {
					inventory : inventoryObjectInTemplateForm
				}

			}).then(function(response) {
				$scope.inventory.token = response.data.token;
				
			}, function(response) {
				// TODO
			});
	}
});