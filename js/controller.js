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
.controller('enquiryController', function($scope, $state, enquiry){
	enquiry.getReceivedLeads('enquiry', sessionStorage.getItem('logged_in')).success(function(now){
		if(now.status){
			$scope.enquries = now.response;
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
})

.controller('detailController',function($scope, $state){
	$scope.userDetail = $state.params.obj;
	//console.log($scope.userDetail);
	$scope.submitQuotation = function(){
		console.log('Quotation Submission Should happen from Here');
	};
})
.controller('searchController',function($scope, $state, enquiry){
	enquiry.search().success(function(data){
		console.log(data);
		$scope.searchData = data;

	}).error(function(err){
		console.log(err);
	});
	//$scope.getSearchResults = function() {
		enquiry.searchCourseLocation()
			.success(function(res) {
				$scope.searchResults = res.response; 
			}).error(function(error) {
				console.log(error);
			});
	//};
		
		$scope.message = {
		   text: 'hello world!',
		   time: "2018-02-01 09:00:00"
		};
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
    var output = [];
    $scope.hidethis = false;
    angular.forEach($scope.location,function(pl){
      if(pl.location_name.toLowerCase().indexOf(locate.toLowerCase())>=0){
        var plc =  pl.location_name + " "+pl.location_city;
        output.push(plc);
      }
      else if(pl.location_pincode.toString().indexOf(locate) >=0){
        var plbypin = pl.location_pincode.toString()+ " "+pl.location_name;
        output.push(plbypin);
      }
    });
    $scope.places = output;
  };

  $scope.filltextbox = function(selectedplace){
    $scope.locate = selectedplace;
    $scope.hidethis = "true";
  };

  $scope.suggestCourses = function(sub){
    var output = [];
    $scope.hidden = false;
    angular.forEach($scope.courselist,function(cr){
      
      if(cr.course_name.toLowerCase().indexOf(sub.toLowerCase()) >=0){
        output.push(cr.course_name);
      }
    });
    $scope.undercourses = output;
  };

  $scope.fillcoursebox = function(crse){
    $scope.subject = crse;
    $scope.hidden = true;
  };

  /*$scope.dispp = function(){
    $scope.hidden = true;
  };*/
  
});