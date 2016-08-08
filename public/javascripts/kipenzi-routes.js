'use strict';

var router = angular.module('kipenzi-router', ['ui.router']);

router.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $stateProvider

        /* Login  */
    
        .state('login', {
            url:'/login',
            templateUrl:"../views/login/login.html",
            controller: 'loginController'
        })
    
        .state('signup', {
            url:'/signup',
            templateUrl:"../views/login/signup.html",
            controller: 'loginController'
        })
    
        /* Menus  */
    
        .state('menu', {
//            url:'/',
            templateUrl:"../views/menu/dashboard.html",
            controller: 'homeController',
            abstract: true
        })
    
        .state('menu.home', {
            url:'/home',
            templateUrl:"../views/menu/home.html",
            controller: 'homeController'
        })
    

//        $urlRouterProvider.otherwise('/home/dashboard');
    
//        if(window.history && window.history.pushState){
//            $locationProvider.html5Mode(true);
//        }
    
});
