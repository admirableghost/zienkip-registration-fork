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
        
        /* Home */
    
        .state('menu.home', {
            url:'/home',
            templateUrl:"../views/menu/menu-home.html",
            controller: 'homeController'
        })
        
        /* Appointment */
        
        .state('menu.appointment', {
            url:'/appointment',
            templateUrl:"../views/menu/menu-appointment.html",
            controller: 'appointmentController'
        })
        
        .state('menu.appointment.register', {
            url:'/register',
            templateUrl:"../views/menu/menu-appointment-register.html",
            controller: 'appointmentRegisterController'
        })
    
        .state('menu.appointment.history', {
            url:'/history',
            templateUrl:"../views/menu/menu-appointment-history.html",
            controller: 'appointmentHistoryController'
        })
    
        /* profile management */    
    
        .state('menu.profile_management', {
            abstract : true,
            url:'/ProfileManagement_Main',
            templateUrl:"../views/menu/menu-profile_management-main.html",
            controller: 'profileManagementController'
        })
    
        .state('menu.calendar', {
            url:'/Calendar',
            templateUrl:"../views/menu/menu-calendar.html",
            controller: 'calendarController'
        })
    
        /* Inventory */
    
        .state('menu.inventory-entry', {
            url:'/inventory-entry',
            templateUrl:"../views/menu/menu-inventory-entry.html",
            controller: 'inventoryEntryController'
        })
    
        .state('menu.inventory-history', {
            url:'/inventory-history',
            templateUrl:"../views/menu/menu-inventory-history.html",
            controller: 'inventoryHistoryController'
        })
        //----------------------------------

        $urlRouterProvider.otherwise('/login');
    
//        if(window.history && window.history.pushState){
//            $locationProvider.html5Mode(true);
//        }
    
});
