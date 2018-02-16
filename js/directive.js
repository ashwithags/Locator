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
})
.directive("randomColor", function () {
    return {
        restrict: 'C',
        replace: false,
        link: function (scope, div, attr) {
            var color = '#' + (Math.random() * 0xFFFFFF << 0).toString(16); 
            div.css('background-color', color);

        }
    }
});