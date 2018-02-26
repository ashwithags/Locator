angular.module('LocatorApp.services', [])

//This JavaScript file "factory.js" for fetching the data from the database and provide it to the controller.
.factory('loginOperation', function($http,$q){
	var services={};
	services.instituteLogin = function(ldata){
		return $http({
			method: 'POST',
			url:'http://localhost:7999/api/v1/institute/loginInstitute',
	        headers: {
            	'Content-Type': 'application/json'
            },
            data: ldata
		})
	}
	services.instituteSignup = function(ldata){
		return $http({
			method: 'POST',
			url:'http://192.168.1.12:7999/api/v1/institute/addinstitute',
	        headers: {
            	'Content-Type': 'application/json'
            },
            data: ldata
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
	services.getStudentsList = function(){
		return $http({
			method: 'GET',
			url:'https://api.myjson.com/bins/13gdxp'
		})
	}
	services.currentPosition = function(){
		return $http({
			method: 'GET',
			url:'https://api.myjson.com/bins/d8ut1'
		})
	}
	services.search = function(){
		return $http({
			method: 'GET',
			url:'https://api.myjson.com/bins/ysy8h'
		})
	}

	return services;

});