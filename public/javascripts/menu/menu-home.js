var app = angular.module('menu-home', []);

app.controller('homeController', function($scope, $rootScope, $http, $state) {
    $rootScope.bodyClass = "nav-md";
});