angular.module('UrbonPro.controllers', [])

.controller('loginController', function($scope, $state, loginOperation) {
	$scope.login = function(loginData) {
		console.log(loginData);
        showDiv=true;
		loginOperation.getUserDetail(loginData).success(function(wow) {
			if (wow.success) {
				console.log(wow.logins);
				console.log(loginData.username);
				var userexist = false;
				for (var i = 0; i < wow.logins.length; i++) {
					console.log(wow.logins[i].username);
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
		}, function(err) {
			console.log(err);
		});
	}
})


.controller('signUpController', function($scope, $state) {
	$state.go('enquiry');
	alert("signin");
	$scope.signUp = function(signUpData) {
		alert("signin");
		console.log(signUpData);
		localStorage.setItem('signupDetail', signUpData);
	}
})

.controller('enquiryController', function($scope, $state,enquiry){
$scope.enquiries= function () {
	enquiry.getEnqList().success(function(now){
		if(now.success){
			console.log("success");
			console.log(now.enq_list);
			console.log(now.enq_list[1].enquired_username.charAt(0));

		}
	})
	}
})