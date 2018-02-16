angular.module('LocatorApp.controllers', [])

.controller('loginController', function($scope, $state, loginOperation) {
	$scope.login = function(loginData) {
		console.log(loginData);
        showDiv=true;/* Doubt*/
		loginOperation.getUserDetail(loginData).success(function(wow) {
			if (wow.success) {
				console.log(wow.logins); // Doubt
				console.log(loginData.username);
				var userexist = false;
				for (var i = 0; i < wow.logins.length; i++) {
					console.log(wow.logins[i].username); // Block
					if (loginData.username === wow.logins[i].username) {
						//alert("match");
						if (loginData.mobile == wow.logins[i].mobile) {
							//alert("match");
							$state.go('homepage');
							userexist = true;
						} else {
							alert("mobile not match");
							userexist = true;
						}
					}
				}
				if (userexist == false) {
					alert("username does not exist");
				}
			}
		},function(err) {
			console.log(err);
		}); // Error
	}
})


.controller('signUpController', function($scope, $state) {
	$state.go('enquiry');// y enquiry page
	alert("signin");
	$scope.signUp = function(signUpData) {
		alert("signin");
		console.log(signUpData);
		localStorage.setItem('signupDetail', signUpData); // doubt
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
})

.controller('contactedController',function($scope, $state, enquiry){
	/*enquiry.getContactedList().success(function(wow){
   		if(wow.success){
   			$scope.contacted = wow.cnt_list;
   			console.log(contacted);

   			console.log(wow.Message);
			console.log(wow.cnt_list);
   		}
   	});*/


	/*enquiry.getContactedList().success(function(info){
		console.log(info);

	}).error(function(err){
		console.log(err);
	});
*/
	
});