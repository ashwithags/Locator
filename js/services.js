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
		}) 
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
	return services;
});