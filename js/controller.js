angular.module('LocatorApp.controllers', [])

.controller('loginController', function($scope, $state, loginOperation, $rootScope) {
	$scope.login = function(loginData) {
		console.log(loginData);
		loginOperation.instituteLogin(loginData).success(function(wow) {
			if (wow.status) {
				sessionStorage.setItem('logged_in',wow.result.id);
				$rootScope.instituteImage = wow.result.inst_images;
				$rootScope.instituteName = wow.result.inst_name;

				$state.go('enquiry',{inst_id: wow.result.id});
			} else {
				alert(wow.message);
			}
		}, function(err) {
			console.log(err);
		}); // Error
	}
	$scope.signUp = function(signUpData) {
		console.log(signUpData);
		signUpData.i_images = "no images";
		loginOperation.instituteSignup(signUpData).success(function(wow) {
			$scope.signUpData = '';
			if (wow.status) {
				$scope.showDiv=true;
				console.log(wow);
				sessionStorage.setItem('logged_in',wow.result.user_id);
				$state.go('selectLocations',{inst_id: wow.result.user_id});
			} else {
				$scope.showDiv=true;
			}
		},function(err) {
			console.log(err);
		});
	}
})
.controller('profileCtrl', function($scope, $state){
	
})
.controller('enquiryController', function($scope, $state, enquiry){
	enquiry.getReceivedLeads('enquiry', sessionStorage.getItem('logged_in')).success(function(now){
		if(now.status){
			$scope.enquries = now.response;
		}
	});
	enquiry.getReceivedLeads("student",3).success(function(info){
		$scope.StudentsList = info.response;
		console.log($scope.StudentsList);
	});
	enquiry.currentPosition().success(function(data){
		$scope.position = data;
		//console.log(position);
	});
	$scope.enquiryDetail = function(data, type){
		console.log(data);
   		//$scope.userDetail = data;
   		$state.go('needuserdetails',{obj: data, type: type});
   	}
   	enquiry.getReceivedLeads('contact', sessionStorage.getItem('logged_in'))
   	.success(function(data) {
   		$scope.contacted = data.response;
   	}).error(function(error) {

   	});
   })

.controller('detailController',function($scope, $state, enquiry){
	//$scope.newmessage='';
	$scope.userDetail = $state.params.obj;
	$scope.type = $state.params.type;
	$scope.submitQuotation = function(){
		console.log($('#message').val());
		console.log($scope.userDetail.transactionid);
		var data = {
			"transactionid": $scope.userDetail.transactionid,
			"message": $('#message').val()
		}
		enquiry.updateInstituteMessage(data).success(function(resp) {
			console.log(resp);
		}).error(function(error) {

		});
	};
	
	$scope.updateTransactionStatus = function(updateTypeTo) {
		var object = {};
		object.trans_id = $scope.userDetail.transactionid;
		object.type = updateTypeTo;
		enquiry.updateLeadStatus(object)
		.success(function(data) {
			if(data.status) {
				$state.go('enquiry')
			}
		}).error(function(error) {

		});
	}
})
.controller('searchController',function($scope, $state, enquiry){
	$scope.courseid = $state.params.location_id;
	$scope.locationid = $state.params.course_id;
	if($scope.courseid == null) {
		$scope.courseid = sessionStorage.getItem('search_course');
		$scope.locationid = sessionStorage.getItem('search_location');
	}
	enquiry.searchCourseLocation($scope.courseid, $scope.locationid).success(function(res) {
		if(res.status)
		{
			for(var i = 0; i<res.response.length; i++) {
				res.response[i].comp_inst = "," + res.response[i].institute_received + ",";
				res.response[i].mobLast3 = String(res.response[i].user_mobile_number).substring(3,1); 
			}
		}
		$scope.comp_inst = "," + sessionStorage.getItem('logged_in') + ",";
		$scope.searchResults = res; 
	}).error(function(error) {
		console.log(error);
	});
})

.controller('selectLocationsController', function($scope, $state, selectLoc){
	selectLoc.getLocations().success(function(res){
		$scope.locations = res.response;
    	//console.log(res);	
    }).error(function(err){
    	console.log(err);
    });

    $scope.checkedItems = function() {
    	$scope.checkedItemsList = [];
    	angular.forEach($scope.locations, function(appObj, arrayIndex){
    		if(appObj.checked) {
    			$scope.checkedItemsList.push(appObj.id);
    		}
    	});
    };
    $scope.saveLocations = function() {
    	var list = $scope.checkedItemsList.join();
    	var obj = {};
    	obj.i_lc = list;
    	obj.i_type = "location";
    	obj.i_id = sessionStorage.getItem('logged_in');
    	selectLoc.saveLocations(obj).success(function(res) {
    		if(res.status) {
    			$state.go('courses');
    		}
    	}).error(function(error){

    	});
    };
})


.controller("courseCtrl", function($scope,$state,courseListProcess){
	courseListProcess.getCourseList().success(function(response){
		if(response.status){
			$scope.courses = response.response;
		}
	}).error(function(err){
		console.log(err);
	});

	$scope.courseLength = true;
	var checkedCourse = [];
	$scope.getCourseId = function(id){

		var search_index = checkedCourse.indexOf(id);
		if(search_index == -1) {
			$scope.courseLength = false;
			//Push into array
			checkedCourse.push(id);
		} else {
			$scope.courseLength = false;
			//Remove from array
			checkedCourse.splice(search_index, 1);
		}
		if(checkedCourse.length < 10){
			console.log(id);
			$scope.check_disable = false;
		} else if(checkedCourse.length >= 10) {
			$scope.check_disable = true;	
		}

		if(checkedCourse.length == 0){
			$scope.courseLength = true;
		}
		
		console.log(checkedCourse);
	}
	$scope.next = function(){

		var courseinfo = {};
		courseinfo.i_lc = checkedCourse.toString();
		courseinfo.i_type = "course";
		courseinfo.i_id = sessionStorage.getItem('logged_in');
		courseListProcess.sendCourseDetails(courseinfo).success(function(resp){
			if(resp.status){
				$state.go('enquiry');
			} else {

			}
		}).error(function(er){
			console.log(er);
		})
	};
})
.controller('headercntrl', function($scope,$state,selectLoc,courseListProcess){

	$scope.hidethis = true;
	$scope.hidden = true;

	selectLoc.getLocations().success(function(res){
		console.log('wow');
		$scope.location = res.response;
	}).error(function(err){
		console.log(err);
	});

  	courseListProcess.getCourseList().success(function(res){
    	$scope.courselist = res.response;
  	}).error(function(err){
	    console.log(err);
	});

$scope.disp = function(){
	$scope.hidethis = true;
};

$scope.suggestLocations = function(locate){
	$scope.places = [];
	$scope.hidethis = false;
	angular.forEach($scope.location,function(pl){
		if(pl.location_name.toLowerCase().indexOf(locate.toLowerCase())>=0){
			var plc =  pl.location_name + " "+pl.location_city;
			pl.plc = plc;
			$scope.places.push(pl);
		} else if(pl.location_pincode.toString().indexOf(locate) >=0){
			var plbypin = pl.location_pincode.toString()+ " "+pl.location_name;
			pl.plc = plbypin;
			$scope.places.push(pl);
		}
	});

};

$scope.filltextbox = function(selectedplace){
	$scope.locate = selectedplace.plc;
	$scope.selectedlocation = selectedplace.id;
	$scope.hidethis = "true";
};

$scope.suggestCourses = function(sub){
	$scope.courses = [];
	$scope.hidden = false;
	angular.forEach($scope.courselist,function(cr){

		if(cr.course_name.toLowerCase().indexOf(sub.toLowerCase()) >=0){
			$scope.courses.push(cr);
		}
	});
};

$scope.fillcoursebox = function(course){
	$scope.subject = course.course_name;
	$scope.selectedcourse = course.id;
	$scope.hidden = true;
};

$scope.capture = function(l,c){
	console.log(l);
	console.log(c);
	//Set these values in Local Session Storage
	sessionStorage.setItem('search_location',l);
	sessionStorage.setItem('search_course',c);
	$state.go('searchResult', { location_id: l, course_id: c});
}

  /*$scope.dispp = function(){
    $scope.hidden = true;
};*/


})
.controller('coursestatusctrl', function($scope,courseListProcess){
	$scope.allCourses = [];
	$scope.availableCourses=[];
	$scope.unavailableCourses = [];

	courseListProcess.getCourseList().success(function(result){
		$scope.courses = result.response;
		angular.forEach($scope.courses,function(ce){
			$scope.allCourses.push(ce.course_id);
		});
	}).error(function(err){
		console.log(err);
	});



	$scope.course_availablity = function(status,id){

		console.log(status,id);
		if(status==true){
			console.log('in here true');
			$scope.availableCourses.push(id);
			if($scope.unavailableCourses.indexOf(id)>=0){
				$scope.unavailableCourses.splice($scope.unavailableCourses.indexOf(id),1);
			}

		}
		if(status == false) {
			console.log($scope.availableCourses.indexOf(id)>=0);
			if($scope.availableCourses.indexOf(id)>=0){
				console.log('in here bro');
				$scope.availableCourses.splice($scope.availableCourses.indexOf(id),1);
				$scope.unavailableCourses.push(id);
			}

		}
		console.log($scope.availableCourses);
		console.log($scope.unavailableCourses);
	};
})
