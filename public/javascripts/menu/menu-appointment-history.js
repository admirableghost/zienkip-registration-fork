var app = angular.module('menu-appointment-history',['smart-table']);    
   
app.factory('appointmentHistoryFactory', function() {

	var appointmentEntries = [];
	
	return {
		
		updateLiveFeedData : function(liveItem) {
            alert('Incoming data from appointment');
			appointmentEntries.push(liveItem);
		},
		
		getTableData : function () {
			return appointmentEntries;
		}
		
	}
});
 	   
app.controller('appointmentHistoryController', function ($scope, appointmentHistoryFactory) {
	$scope.appointmentEntries = appointmentHistoryFactory.getTableData();
});