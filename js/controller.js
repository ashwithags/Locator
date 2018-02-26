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
});
