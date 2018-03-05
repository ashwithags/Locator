angular.module('LocatorApp.services', [])

.factory('loginOperation', function($http,$q){
	var services={};
	services.instituteLogin = function(ldata){
		return $http({
			method: 'POST',
			url:'http://192.168.1.12:7999/api/v1/institute/loginInstitute',
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
	services.searchCourseLocation = function() {
		return $http({
			method: 'GET',
			url: 'http://192.168.1.12:7999/api/v1/institute/searchStudents/2/3'
		})
	}
	services.getReceivedLeads = function(type, inst_id) {
		return $http({
			method: 'GET',
			url: 'http://192.168.1.12:7999/api/v1/institute/receivedleads/'+type+'/'+inst_id
		})
	}
	return services;

})

.factory("selectLoc", function($http){
	var services = {};
	services.getLocations = function(){
		return $http({
			url: 'http://192.168.1.12:7999/api/v1/search/alllocation',
			method: 'GET'				
		})
	}
	services.saveLocations = function(slocdata) {
		return $http({
			url: 'http://192.168.1.12:7999/api/v1/institute/updatelc',
			method: 'POST',
			header: {
				'Content-Type': 'application/json'
			},
			data: slocdata
		});
	}
	return services;
})



.factory("courseListProcess", function($http){
	var services = {};
	services.getCourseList = function(){
		return $http({
			url: 'http://192.168.1.12:7999/api/v1/search/allcourses',
			method: 'GET'
		});
	};
	
	services.sendCourseDetails = function(info){
		return $http({
			url:"http://192.168.1.12:7999/api/v1/institute/updatelc",
			method:"POST",
			data:info

		})
	}
	return services;
});
