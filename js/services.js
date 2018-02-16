angular.module('LocatorApp.services', [])

//This JavaScript file "factory.js" for fetching the data from the database and provide it to the controller.
.factory('loginOperation', function($http,$q){
	var services={};
	services.getUserDetail = function(ldata){
	//console.log(ldata);
	var string = "ankan"+":"+"Mukhopadhyay";
	//var encoding = btoa(string);
		return $http({
			method: 'GET',
			url: 'json/login.json',
            dataType: 'json',
            headers: {
            	'Authorization': 'Basic '+string
            },
		}) // Doubt
	}
	return services;
	
})
.factory('enquiry',function($http){
	var services={};
	services.getEnqList = function(){
		return $http({
			method: 'GET',
			url: 'json/enquiry.json',
			dataType: 'json'
		})
	},
	services.getContactedList = function(){
		return $http({
			method: 'GET',
			url: 'json/contacted.json',
			dataType: 'json'
		})
	}
	services.getStudentsList = function(){
		return $http({
			method: 'GET',
			url:'https://api.myjson.com/bins/13gdxp'
			// url: 'https://api.myjson.com/bins/i5wyh'
			/*dataType: 'json'*/
		})
	}
	services.currentPosition = function(){
		return $http({
			method: 'GET',
			url:'https://api.myjson.com/bins/d8ut1'
			//url:'https://api.myjson.com/bins/qo0pl'
		})
	}

	return services;

});