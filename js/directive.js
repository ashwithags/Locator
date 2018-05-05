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
            var color = '#' + (Math.random().toString(16) + "000000").substring(2,8);
            //var color = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
            if(color == '#FFFFFF'){
              color = '#177FE4';
            }
            div.css('background-color', color);
        }
    }
});
