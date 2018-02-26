angular.module('LocatorApp.controllers', [])

.controller('loginController', function($scope, $state, loginOperation) {
	$scope.login = function(loginData) {
		console.log(loginData);
        showDiv=true;
		loginOperation.instituteLogin(loginData).success(function(wow) {
			//console.log(wow);
			if (wow.status) {
				sessionStorage.setItem('logged_in',wow.result.id);
				$state.go('selectLocations',{inst_id: wow.result.id});
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
			} else {
				$scope.showDiv=true;
			}
		},function(err) {
			console.log(err);
		});
	}
})
.controller('enquiryController', function($scope, $state, enquiry){
	enquiry.getEnqList().success(function(now){
		if(now.success){
			$scope.enquries = now.enq_list;
		}
	});
	enquiry.getContactedList().success(function(wow){
   		if(wow.success){
   			$scope.contacted = wow.cnt_list;
   			//console.log(contacted);
   		}
   	});
   	enquiry.getStudentsList().success(function(info){
		$scope.StudentsList = info;
		//console.log(StudentsList);
   	});
   	enquiry.currentPosition().success(function(data){
		$scope.position = data;
		//console.log(position);
   	});
   	$scope.enquiryDetail = function(data){
   		console.log(data);
   		//$scope.userDetail = data;
   		$state.go('needuserdetails',{obj: data});
   	}
   /*	$scope. = function(){
   		$state.go('searchResult');
   	}*/

})

.controller('detailController',function($scope, $state){
	$scope.userDetail = $state.params.obj;
	//console.log($scope.userDetail);
})
.controller('searchController',function($scope, $state, enquiry){
	enquiry.search().success(function(data){
		console.log(data);
		$scope.searchData = data;

	}).error(function(err){
		console.log(err);
	});
})

.controller('selectLocationsController', function($scope, $state, selectLoc){
	$scope.checkedItemsList = [];
	selectLoc.getLocations().success(function(res){
    	$scope.locations = res.response;
    	//console.log(res);	
    }).error(function(err){
    	console.log(err);
    })
    $scope.checkedItems = function() {
		$scope.checkedItemsList = [];
		angular.forEach($scope.locations, function(appObj, arrayIndex){
			if(appObj.checked) {
				$scope.checkedItemsList.push(appObj.id);
			}
		});
		//console.log(checkedItems);
		//return $scope.checkedItemsList;
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

//courseList Ctrl - Dinesh
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
		if(checkedCourse.length < 2){
			console.log(id);
			$scope.check_disable = false;
		} else if(checkedCourse.length >= 2) {
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
		courseinfo.i_type = "courseList";
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
});