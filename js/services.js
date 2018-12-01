angular.module('LocatorApp.services', [])

.factory('loginOperation', function($http,$q){
	var services={};
	services.instituteLogin = function(ldata){
		return $http({
			method: 'POST',
			url:'http://localhost:7999/api/v1/loginInstitute',
	        headers: {
            	'Content-Type': 'application/json',
            	'token': sessionStorage.getItem('accessToken')
            },
            data: ldata
		})
	}
	services.instituteSignup = function(ldata){
		return $http({
			method: 'POST',
			url:'http://localhost:7999/api/v1/institute/addinstitute',
	        headers: {
            	'Content-Type': 'application/json',
            	'token': sessionStorage.getItem('accessToken')
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
			headers: {
            	'Content-Type': 'application/json',
            	'token': sessionStorage.getItem('accessToken')
            }
		})
	},
	services.getContactedList = function(){
		return $http({
			method: 'GET',
			url: 'json/contacted.json',
			headers: {
            	'Content-Type': 'application/json',
            	'token': sessionStorage.getItem('accessToken')
            }
		})
	}
	services.currentPosition = function(){
		return $http({
			method: 'GET',
			url:'https://api.myjson.com/bins/d8ut1',
			headers: {
            	'Content-Type': 'application/json',
            	'token': sessionStorage.getItem('accessToken')
            }
		})
	}
	services.getMessages = function(tranxid){
		return $http({
			method: 'GET',
			url:'http://localhost:7999/api/v1/user/usermessage/'+tranxid,
			headers: {
            	'Content-Type': 'application/json',
            	'token': sessionStorage.getItem('accessToken')
            }
		})
	}
	services.searchCourseLocation = function(course, location) {
		return $http({
			method: 'GET',
			url: 'http://localhost:7999/api/v1/institute/searchStudents/' + course + '/' + location,
			headers: {
            	'Content-Type': 'application/json',
            	'token': sessionStorage.getItem('accessToken')
            }
		})
	}
	services.getReceivedLeads = function(type, inst_id) {
		return $http({
			method: 'GET',
			url: 'http://localhost:7999/api/v1/institute/receivedleads/'+type+'/'+inst_id,
			headers: {
            	'Content-Type': 'application/json',
            	'token': sessionStorage.getItem('accessToken')
            }
		})
	}
	services.updateLeadStatus = function(data) {
		return $http({
			method: 'POST',
			url: 'http://localhost:7999/api/v1/institute/updateleadstatus',
			header: {
				'Content-Type': 'application/json',
            	'token': sessionStorage.getItem('accessToken')
			},
			data: data
		})
	}
	services.updateInstituteMessage = function(data) {
		return $http({
			method: 'POST',
			url: 'http://localhost:7999/api/v1/institute/sendMessage',
			header: {
				'Content-Type': 'application/json',
            	'token': sessionStorage.getItem('accessToken')
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
				'Content-Type': 'application/json',
            	'token': sessionStorage.getItem('accessToken')
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
				'Content-Type': 'application/json',
            	'token': sessionStorage.getItem('accessToken')
			}
		});
	};
	services.getstaticLocations = function(data){
		return $http({
			url: 'http://localhost:7999/api/v1/institute/offerings',
			method: 'POST',
			header: {
				'Content-Type': 'application/json',
            	'token': sessionStorage.getItem('accessToken')
			},
			data: data
		})
	};
	services.getLocationByCity = function(data){
		var searchUrl = 'http://localhost:7999/api/v1/search/alllocation/'+data;
		return $http({
			url: searchUrl,
			method: 'GET',
			headers: {
            	'Content-Type': 'application/json',
            	'token': sessionStorage.getItem('accessToken')
            }
		})
	};
	services.getLocations = function(data){
		var searchUrl = 'http://localhost:7999/api/v1/search/alllocation';
		return $http({
			url: searchUrl,
			method: 'GET',
			headers: {
            	'Content-Type': 'application/json',
            	'token': sessionStorage.getItem('accessToken')
            }
		})
	};
	services.saveLocations = function(slocdata) {
		return $http({
			url: 'http://localhost:7999/api/v1/institute/updatelc',
			method: 'POST',
			header: {
				'Content-Type': 'application/json',
            	'token': sessionStorage.getItem('accessToken')
			},
			data: slocdata
		});
	};
	services.updateCourseNLocationInfo = function(updatedInfo) {
		return $http({
			url: 'http://localhost:7999/api/v1/institute/updateLocationandCourseOffering',
			method: 'PUT',
			header: {
				'Content-Type': 'application/json',
            	'token': sessionStorage.getItem('accessToken')
			},
			data: updatedInfo
		});
	};
	return services;
})



.factory("courseListProcess", function($http){
	var services = {};

	services.staticgetCourseList = function(){
		return $http({
			url:"../data/course_status.json",
			method:"GET",
			headers: {
            	'Content-Type': 'application/json',
            	'token': sessionStorage.getItem('accessToken')
            }
		});
	};
	services.getCourseList = function(){
		return $http({
			url: 'http://localhost:7999/api/v1/search/allcourses',
			method: 'GET',
			headers: {
            	'Content-Type': 'application/json',
            	'token': sessionStorage.getItem('accessToken')
            }
		})
	}
	services.sendCourseDetails = function(info){
		return $http({
			url:"http://localhost:7999/api/v1/institute/updatelc",
			method:"POST",
			data:info,
			headers: {
            	'Content-Type': 'application/json',
            	'token': sessionStorage.getItem('accessToken')
            }

		})
	}
	return services;
});
