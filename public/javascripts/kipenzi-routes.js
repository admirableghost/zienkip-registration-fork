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
            templateUrl:"../views/menu/dashboard.html",
            controller: 'dashboardController',
            abstract: true
        })
    
        .state('menu.home', {
            url:'/home',
            templateUrl:"../views/menu/menu-home.html",
            controller: 'homeController'
        })
        
        .state('menu.appointment-register', {
            url:'/appointment-register',
            templateUrl:"../views/menu/menu-appointment-register.html",
            controller: 'appointmentController'
        })
    
        .state('menu.appointment-history', {
            url:'/appointment-history',
            templateUrl:"../views/menu/menu-appointment-register.html",
            controller: 'homeController'
        })
    
         .state('menu.profilemanagement', {
            abstract : true,
            url:'/ProfileManagement_Main',
            templateUrl:"../views/menu/Profile_Management_Main.html",
            controller: 'profile_management_controller'
        })
        //----------------------------------

        $urlRouterProvider.otherwise('/login');
    
//        if(window.history && window.history.pushState){
//            $locationProvider.html5Mode(true);
//        }
    
});
