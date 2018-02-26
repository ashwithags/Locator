angular.module('LocatorApp.controllers', [])

.controller('loginController', function($scope, $state, loginOperation) {
	$scope.login = function(loginData) {
		console.log(loginData);
        showDiv=true;
		loginOperation.instituteLogin(loginData).success(function(wow) {
			//console.log(wow);
			if (wow.status) {
				sessionStorage.setItem('logged_in',wow.result.id);
				$state.go('enquiry',{inst_id: wow.result.id});
			} else {
				alert(wow.message);
			}
		},function(err) {
			console.log(err);
		}); // Error
	}
	$scope.signUp = function(signUpData) {
		console.log(signUpData);
		signUpData.i_images = "no images";
		loginOperation.instituteSignup(signUpData).success(function(wow) {
			if (wow.status) {
				showDiv=true;
			} else {
				alert(wow.message);
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
})
