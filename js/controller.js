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
.controller('instiCtrl', function($scope, $state){
	$scope.edit1 = true;
	$scope.editphoto = function(){
		$scope.edit1 = false;
	};
	$scope.edit2 = true;
	$scope.editabout = function(){
		$scope.edit2 = false;
	};
	$scope.edit3 = true;
	$scope.editdesc = function(){
		$scope.edit3 = false;
	};
	$scope.edit4 = true;
	$scope.editbasic = function(){
		$scope.edit4 = false;
	};
	$scope.edit5 = true;
	$scope.editcntct = function(){
		$scope.edit5 = false;
	};

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
	$scope.msgbox = false;
	$scope.msgbox1 = true;
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
			$scope.msgbox = true;
			$scope.msgbox1 = true;
			$scope.userDetail.message = data.message;
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
.controller('coursestatusctrl', function($scope,selectLoc){
	
	$scope.availableCourses=[];
	$scope.unavailableCourses = [];
	$scope.idOfava_cour = [];
	$scope.idOfunava_cour = [];

	$scope.hide = false;
	$scope.hidden = false;

	var coursedata = { "i_id": sessionStorage.getItem('logged_in'), "i_type": "course" };
	var locationdata = { "i_id": sessionStorage.getItem('logged_in'), "i_type": "location" };

	selectLoc.getstaticLocations(coursedata).success(function(result){
		$scope.courses = result.response;
		angular.forEach($scope.courses,function(ce){
			if(ce.opted=="true"){
				$scope.availableCourses.push(ce);
				$scope.idOfava_cour.push(ce.id);
			} else {
				$scope.unavailableCourses.push(ce);
				$scope.idOfunava_cour.push(ce.id);
			}
		});
		console.log($scope.availableCourses);
		console.log($scope.unavailableCourses);
	}).error(function(err){
		console.log(err);
	});

	selectLoc.getstaticLocations(locationdata).success(function(result){

		$scope.availableLocations = [];
		$scope.availableLocationsid = [];
		$scope.unavailableLocationsid = [];
		$scope.regLocations = result.response;

		angular.forEach($scope.regLocations, function(ce){
			if(ce.opted == "true"){
				ce.Complc = ce.location_name+" "+ce.location_city;
				$scope.availableLocations.push(ce);	
				$scope.availableLocationsid.push(ce.id);
			}else {
				$scope.unavailableLocationsid.push(ce.id);
			}	
		});
		console.log($scope.availableLocations);	
	});

	$scope.showRegCourses = function(keyword){
		$scope.hide = true;
		$scope.regCourses = [];
		angular.forEach($scope.courses, function(ce){
			if(ce.course_name.toLowerCase().indexOf(keyword.toLowerCase()) >=0){
				$scope.regCourses.push(ce);
			}
		});
	};

	$scope.showAvaLoc = function(locate){
		$scope.hidden = true;
		$scope.avaLoc = [];
		angular.forEach($scope.regLocations, function(ce){
			if(ce.location_name.toLowerCase().indexOf(locate.toLowerCase()) >=0){
				ce.plc = ce.location_name+" "+ce.location_city;
				$scope.avaLoc.push(ce);
			}
			else if (ce.location_pincode.toString().indexOf(locate) >=0){
				ce.plc = ce.location_pincode.toString()+" "+ce.location_city;
				$scope.avaLoc.push(ce);
			}
		});
	};

	$scope.course_availablity = function(status,id){

		console.log(status,id);
		if(status==false){
			$scope.idOfava_cour.push(id);
			if($scope.idOfunava_cour.indexOf(id)>=0){
				$scope.idOfunava_cour.splice($scope.idOfunava_cour.indexOf(id),1);
			}

		}
		if(status == true) {
			if($scope.idOfava_cour.indexOf(id)>=0){
				$scope.idOfava_cour.splice($scope.idOfava_cour.indexOf(id),1);
				$scope.idOfunava_cour.push(id);
			}
		}
		console.log($scope.idOfava_cour);
		console.log($scope.idOfunava_cour);
	};

	$scope.place_availablity = function(stat,ide){

		if(stat == false){
			$scope.availableLocationsid.push(ide);
			if($scope.unavailableLocationsid.indexOf(ide)>=0){
				$scope.unavailableLocationsid.splice($scope.unavailableLocationsid.indexOf(ide),1);
			}
		}
		if(stat == true){
			if($scope.availableLocationsid.indexOf(ide)>=0){
				$scope.availableLocationsid.splice($scope.availableLocationsid.indexOf(ide),1);
				$scope.unavailableLocationsid.push(ide);
			}
		}
		console.log($scope.availableLocationsid);
		console.log($scope.unavailableLocationsid);
	};	
	

})
