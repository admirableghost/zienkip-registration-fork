var app = angular.module('kipenzi-directives', []);

//directive button-panel
app.directive('buttonPanel', ['$compile', function($compile) {
          
     var link = function (scope, element, attrs, ngModel) {
         
        if (angular.isUndefined(scope.showHide)){
            scope.showHide = true;
        }
         
        ngModel.$setViewValue(scope.showHide);
         
        scope.toggleShowHide = function toggleShowHide() {
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
            showHide: "=show"
		},
        
        template:
            '<ul class="nav navbar-right panel_toolbox">' +
                '<li><a href="" ng-click="toggleShowHide()"><i class="{{showHideButton[showHide]}}" style="color:green"></i></a></li>' +
                '<li><a href=""><i class="fa fa-wrench" style="color:#848484"></i></a></li>' +
                '<li><a class="close-link"><i class="fa fa-close" style="color:red"></i></a></li>' +
            '</ul>',
        
		compile: function(element, attrs) {
            
			if (angular.isUndefined(attrs.isDisabled)) {
				attrs.isDisabled = false;
			}
            
            return link;
            
		}
	};
}]);

app.directive('kipenziDiv', ['buttonPanel','$compile', function(buttonPanel,$compile) {
    return {
        scope: {
            heading: '='
        },
        template: 
        
        '<div class="x_panel">' +
          '<div class="x_title">' +
            '<h2>{{heading}}<small>check mobile number and enter</small></h2>' +
            '<span class="badge bg-blue">Token : {{appointment.token}}</span>' +
            '<div button-panel ng-model="show" show=true></div>'  +
            '<div class="clearfix"></div>' +
            '</div>' +
          '<div class="x_content" ng-show="show">' +
            '<br />' +
            '<div>' +
              //content
            '</div>' +
          '</div>' +
        '</div>'
    }
}]);