angular.module('LocatorApp', ['ui.router','ngDialog','LocatorApp.controllers','LocatorApp.services','LocatorApp.directive','angularMoment'])
.config(function($stateProvider, $urlRouterProvider){
	   $urlRouterProvider.otherwise('login');

	$stateProvider
		.state('login',{
			url: '/login',
			templateUrl : 'pages/login.html',
			controller : 'loginController'
		})
		.state('homepage',{
			url: '/home',
			templateUrl : 'pages/home.html'/*,
			controller : 'homeController'*/
		})
		.state('enquiry',{
			url: '/enquiry',
			templateUrl : 'pages/enquiry.html',
			params: {
				inst_id: null
			},
			controller : 'enquiryController'
		})
		.state('needuserdetails',{
			url: '/needuserdetails',
			params: {
				obj: null,
				type: null
			},
			templateUrl : 'pages/userDetails.html',
			controller : 'detailController'
		})
		.state('searchResult',{
			url: '/searchResult',
			templateUrl : 'pages/search.html',
			params: {
				location_id: null,
				course_id: null
			},
			controller : 'searchController'
		})
		.state('selectLocations',{
			url: '/selectLocations',
			templateUrl : 'pages/selectLocations.html',
			params: {
				selected_location: null
			},
			controller : 'selectLocationsController'
		})
		.state('courses',{
			url: '/courses',
			templateUrl : 'pages/selectCourse.html',
			controller: 'courseCtrl'
		})
		.state("coursestatus",{
			url:"/coursestatus",
			templateUrl:"pages/coursestatus.html",
			controller:"coursestatusctrl"
		})
		.state('profile',{
			url: '/profile',
			templateUrl : 'pages/profileinfo.html',
			controller: 'profileCtrl'
		})
		.state('instituteInfo',{
			url:'/instituteInfo',
			templateUrl : 'pages/instituteInfo.html',
			controller: 'instiCtrl'
		})
});
