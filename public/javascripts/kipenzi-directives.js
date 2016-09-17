var app = angular.module('kipenzi-directives', []);

//directive button-panel
app.directive('buttonPanel', ['$compile', function($compile) {
          
     var link = function (scope, element, attrs, ngModel) {
         
        if (angular.isUndefined(scope.showHide)){
            scope.showHide = true;
        }
        if (angular.isUndefined(scope.hasClose)){
            scope.hasClose = false;
        }
        if (angular.isUndefined(scope.hasSettings)){
            scope.hasSettings = false;
        }
        if (angular.isUndefined(scope.hasShowHide)){
            scope.hasShowHide = false;
        }
         
         
         
        ngModel.$setViewValue(scope.showHide);
         
        scope.toggleShowHide = function () {
            scope.showHide = !scope.showHide;
            ngModel.$setViewValue(scope.showHide);
        };
           
        scope.showHideButton = {
            false   : "fa fa-chevron-down",
            true    : "fa fa-chevron-up" 
        };
         
     }
     
	return {
		restrict: 'EA',
		replace: true,
		require:'ngModel',
		scope: {
			isDisabled: '=',
            showHide: "@show",
            hasClose: "@",
            hasSettings: "@",
            hasShowHide: "@",
            onClose: "&",
            onSettings: "&",
		},
        
        template:
            '<ul class="nav navbar-right button_panel">' +
                '<li ng-if="hasShowHide"><a ng-click="toggleShowHide()"><i class="{{showHideButton[showHide]}}" style="color:green"></i></a></li>' +
                '<li ng-if="hasSettings"><a ng-click="onSettings(caller)"><i class="fa fa-wrench" style="color:#848484"></i></a></li>' +
                '<li ng-if="hasClose"><a ng-click="onClose(caller)"class="close-link"><i class="fa fa-close" style="color:red"></i></a></li>' +
            '</ul>',
        
		compile: function(element, attrs) {
            
			if (angular.isUndefined(attrs.isDisabled)) {
				attrs.isDisabled = false;
			}
            
            return link;
            
		}
	};
}]);