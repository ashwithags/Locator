angular.module('LocatorApp', ['ui.router','LocatorApp.controllers','LocatorApp.services','LocatorApp.directive'])
.config(function($stateProvider, $urlRouterProvider){
	   $urlRouterProvider.otherwise('login');	
	
	$stateProvider
		.state('login',{
			url: '/login',
			templateUrl : 'pages/login.html',
			controller : 'loginController'
		})
		.state('signUp',{
			url: '/signup',
			templateUrl : 'pages/login.html',
			controller : 'signUpController'
		})
		.state('homepage',{
			url: '/home',
			templateUrl : 'pages/home.html'/*,
			controller : 'homeController'*/
		})
		.state('enquiry',{
			url: '/enquiry',
			templateUrl : 'pages/enquiry.html',
			controller : 'enquiryController'
		})
		.state('contacted',{
			url: '/contacted',
			templateUrl : 'pages/enquiry.html',
			controller : 'contactedController'
		})
	});