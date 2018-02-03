angular.module('LocatorApp.directive',[])
.directive('header',function(){
	return{
		templateUrl: 'pages/header.html'
	};
})
.directive('sidebar',function(){
	return{
		templateUrl: 'pages/left-sidebar.html'
	};
});