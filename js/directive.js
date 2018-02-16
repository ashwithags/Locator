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
.directive("randomBackgroundcolor", function () {
    return {
        restrict: 'EA',
        replace: false,
        link: function (scope, div, attr) {

            //generate random color
            var color = '#' + (Math.random() * 0xFFFFFF << 0).toString(16); 
            
            //Add random background class to selected element
            div.css('background-color', color);

        }
    }
});