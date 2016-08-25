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
            controller: 'dashboardController'
            
        })
    
        .state('menu.home', {
            url:'/home',
            templateUrl:"../views/menu/menu-home.html",
            controller: 'homeController'
        })
        
        .state('menu.appointment', {
            url:'/appointment',
            templateUrl:"../views/menu/menu-appointment.html",
            controller: 'homeController'
        })
    
        //--------------------------------- For testing a static page - Avvai - 21_Aug_2016
        // * This block needs to be removed after testing
        
        .state('staticPage_ProfileManagement', {
            url:'/staticPage',
            templateUrl:"../views/menu/Profile_Management.html",
            controller:'profile_management_controller'
        }) 
        
        .state('staticPage_Appointments', {
            url:'/staticPage',
            templateUrl:"../views/menu/Appointments_Page.html",
            controller:'appointment_controller'
        }) 
        //----------------------------------

        $urlRouterProvider.otherwise('/login');
    
//        if(window.history && window.history.pushState){
//            $locationProvider.html5Mode(true);
//        }
    
});
