angular.module('LocatorApp.services', [])

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
			url:'http://localhost:7999/api/v1/institute/addinstitute',
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
	services.currentPosition = function(){
		return $http({
			method: 'GET',
			url:'https://api.myjson.com/bins/d8ut1'
		})
	}
	services.getMessages = function(tranxid){
		return $http({
			method: 'GET',
			url:'http://localhost:7999/api/v1/user/usermessage/'+tranxid
		})
	}
	services.searchCourseLocation = function(course, location) {
		return $http({
			method: 'GET',
			url: 'http://localhost:7999/api/v1/institute/searchStudents/' + course + '/' + location
		})
	}
	services.getReceivedLeads = function(type, inst_id) {
		return $http({
			method: 'GET',
			url: 'http://localhost:7999/api/v1/institute/receivedleads/'+type+'/'+inst_id
		})
	}
	services.updateLeadStatus = function(data) {
		return $http({
			method: 'POST',
			url: 'http://localhost:7999/api/v1/institute/updateleadstatus',
			header: {
				'Content-Type': 'application/json'
			},
			data: data
		})
	}
	services.updateInstituteMessage = function(data) {
		return $http({
			method: 'POST',
			url: 'http://localhost:7999/api/v1/institute/sendMessage',
			header: {
				'Content-Type': 'application/json'
			},
			data: data
		})
	}
	return services;

})

.factory("selectLoc", function($http){
	var services = {};
	services.updateInfo = function(infodata) {
		infodata.instid = sessionStorage.getItem('logged_in');
		return $http({
			url: 'http://localhost:7999/api/v1/institute/updateInstituteBasicInfo',
			method: 'POST',
			header: {
				'Content-Type': 'application/json'
			},
			data: infodata
		});
	};
	services.getInstituteInfo = function(infodata) {
		var url = 'http://localhost:7999/api/v1/institute/getInstituteInformation/'+sessionStorage.getItem('logged_in');
		return $http({
			url: url,
			method: 'GET',
			header: {
				'Content-Type': 'application/json'
			}
		});
	};
	services.getstaticLocations = function(data){
		return $http({
			url: 'http://localhost:7999/api/v1/institute/offerings',
			method: 'POST',
			header: {
				'Content-Type': 'application/json'
			},
			data: data
		})
	};
	services.getLocations = function(){
		return $http({
			url: 'http://localhost:7999/api/v1/search/alllocation',
			method: 'GET'
		})
	};
	services.saveLocations = function(slocdata) {
		return $http({
			url: 'http://localhost:7999/api/v1/institute/updatelc',
			method: 'POST',
			header: {
				'Content-Type': 'application/json'
			},
			data: slocdata
		});
	};
	return services;
})



.factory("courseListProcess", function($http){
	var services = {};

	services.staticgetCourseList = function(){
		return $http({
			url:"../data/course_status.json",
			method:"GET"
		});
	};
	services.getCourseList = function(){
		return $http({
			url: 'http://localhost:7999/api/v1/search/allcourses',
			method: 'GET'
		})
	}
	services.sendCourseDetails = function(info){
		return $http({
			url:"http://localhost:7999/api/v1/institute/updatelc",
			method:"POST",
			data:info

		})
	}
	return services;
});
