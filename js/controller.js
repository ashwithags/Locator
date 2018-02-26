angular.module('LocatorApp.controllers', [])

.controller('loginController', function($scope, $state, loginOperation) {
	$scope.login = function(loginData) {
		console.log(loginData);
        loginOperation.instituteLogin(loginData).success(function(wow) {
			console.log(wow);
			if (wow.status) {
				sessionStorage.setItem('logged_in',wow.result.id);
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
//courseList Ctrl - Dinesh
.controller("courseCtrl", function($scope,$state,courseListProcess){
	courseListProcess.getCourseList().success(function(response){
		//console.log(response.status);
		if(response.status){
			//console.log(response.response);
			$scope.courses = response.response;
		}
	}).error(function(err){
		console.log(err);
	});


	var checkedCourse = [];
	$scope.getCourseId = function(id){
		var search_index = checkedCourse.indexOf(id);
		if(search_index == -1) {
			//Push into array
			checkedCourse.push(id);
		} else {
			//Remove from array
			checkedCourse.splice(search_index, 1);
		}
		//console.log(checkedCourse.length);
		if(checkedCourse.length < 2){
			console.log(id);
			$scope.check_disable = false;
		} else if(checkedCourse.length >= 2) {
			$scope.check_disable = true;	
		}
		
		console.log(checkedCourse);
	}
	$scope.next = function(){
		var courseinfo = {};
		courseinfo.i_lc = checkedCourse.toString();
		courseinfo.i_type = "courseList";
		courseinfo.i_id = "18";
		console.log(courseinfo);
		courseListProcess.sendCourseDetails(courseinfo).success(function(resp){
				console.log(resp);
		}).error(function(er){
			console.log(er);
		})
	};
})
