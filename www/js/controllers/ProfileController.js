angular.module('starter.controllers')

.controller('ProfileController', function($scope, $state, $q, UserService, $ionicLoading, $ionicPopup, $firebaseAuth, moment) {

	var _this = this;	
	$scope.pregnancy_status = 'currently_pregnant';
	$scope.pregnancyWeekLabel = false;
	$scope.userOTP = {};
	$scope.retryCount = 0;
	$scope.user = {};
	$scope.name = '';
	$scope.week_track;

	UserService.getUser(function(userObj){
		// console.log('userObj----------->', JSON.stringify(userObj));
		$scope.user = userObj
		$scope.name = userObj.name;
	}, function(){
		// console.log('userObj-----------> ERROR');
	});
	
	var saveInfoAndShowNextView = function(scopeRef) {
		var scopeObj = scopeRef;
		var userName = scopeObj.user.name || '';
		var userEmail = scopeObj.user.email || '';
		var userPicture = scopeObj.user.picture || '';

		var data = {
			name: userName,
			email: userEmail,
			picture: userPicture,
			age: scopeObj.age,
			pregnant: scopeObj.pregnancy_status,
			contact_number: scopeObj.contact_number
		};

		var hotlineCustomData = {
			age: scopeObj.age,
			pregnant: scopeObj.pregnancy_status
		};
		
		var previousDate = moment().subtract(scopeObj.week_track*7, 'days');
		console.log('previousDate---------->', previousDate);
		formattedPreviousDate = previousDate.clone().format('LL');
		if(scopeObj.pregnancy_status == 'currently_pregnant') {
			data['pregnancy_start_date'] = formattedPreviousDate;
			hotlineCustomData['pregnancy_start_date'] = formattedPreviousDate;

			// save pregnancy start date in local data
			scopeObj.user['pregnancy_start_date'] = previousDate;
			UserService.setUser(scopeObj.user);
		}

		var firebaseUser = firebase.auth().currentUser;
		console.log('firebaseUser:', firebaseUser);
		firebase.database().ref('users/' + firebaseUser.uid).set(data);

		// set hotline information
		setHotlineUserInfo(userName, userEmail, firebaseUser.uid, scopeObj.contact_number, hotlineCustomData);

		// move to new state
		$state.go('app.chats');
	};

	var sendOTP = function(mobileNumber) {
		if(mobileNumber == '1234512345') {
			return;
		}

		if($scope.retryCount > 3) {
			$ionicPopup.alert({
				title: 'Excuse us',
			 	template: 'System failed to verify your phone number multiple times. Please try again after few hours!'
			});
			return;
		}

		$scope.verification = sinchClient.createSmsVerification('+91'+ mobileNumber);
		console.log('verification:', $scope.verification);
		// to send message to the user
		$scope.verification.initiate(function(){
			console.log('SMS SEND SUCCESSFULLY');
		}, function() {
			console.log('FAILED TO SEND SMS');
			$ionicPopup.alert({
				title: 'Excuse us',
			 	template: 'Failed to send SMS, please retry!'
			});
		});
	};

	var showOTPpopUp = function(scopeRef) {

		if(scopeRef.retryCount > 3) {
			$ionicPopup.alert({
				title: 'Excuse us',
			 	template: 'System failed to verify your phone number multiple times. Please try again after few hours!'
			});
			return;
		}

		// initialise with empty object
		$scope.userOTP = {};

		// popup for OTP
		var myPopup = $ionicPopup.show({
		    template: '<input type="tel" ng-model="userOTP.otp">',
		    title: 'Enter Verification Code',
		    subTitle: 'Please enter verificatoin code received via sms',
		    scope: $scope,
		    buttons: [
		      	{ 
		      		text: 'Cancel'
		       	},
		      	{
		        	text: '<b>Verify</b>',
		        	type: 'button-positive',
			        onTap: function(e) {
			          	if (!$scope.userOTP.otp) {
			            	//don't allow the user to close unless he enters OTP
			            	e.preventDefault();
			          	} else {
			            	return $scope.userOTP.otp;
			          	}
			        }
		      	}
		    ]
        }).then(function(res) {
			console.log('Tapped!', res);

			if(!isNaN(res)) {
				console.log('scopeRef.verification', scopeRef.verification);
				
				if(!window.livheaDebug) {
					console.log('--------------------> L1');
					// trigger verify call with server
					$scope.verification.verify(res, function() {
						saveInfoAndShowNextView(scopeRef);

					}, function() {

						scopeRef.retryCount++;
						console.log('phone number not verified');
						// show error alert and ask to verify again
						$ionicPopup.alert({
							title: 'OTP Error',
						 	template: 'System failed to verify your phone number. Please try again!'
						});
					});
				} else {
					console.log('--------------------> L2');
					console.log('Did that---------------->');
					saveInfoAndShowNextView(scopeRef);
				}

			}

        }, function(err) {
        	console.log('Err:', err);
			$ionicPopup.alert({
				title: 'OTP Error',
			 	template: 'System failed to verify your phone number. Please try again!'
			});
			return;
        }, function(msg) {
        	console.log('message:', msg);
        });
	}

	$scope.pregnancyChanged = function() {
		console.log('checked or unchecked');
		console.log('status:' ,this.pregnancy_status);
		if(this.pregnancy_status == 'currently_pregnant') {
			$scope.pregnancyWeekLabel = false;
		} else {
			$scope.pregnancyWeekLabel = true;
		}
	};

	$scope.saveProfile = function() {
		if(!isValidAge(this.age)) {
			$ionicPopup.alert({
				title: 'Incorrect age',
			 	template: 'Please check age value!'
			});
			return;
		}

		if((this.pregnancy_status == 'currently_pregnant') && !isValidPregnancyWeek(this.week_track)) {
			$ionicPopup.alert({
				title: 'Incorrect weeks',
			 	template: 'Please enter a pregnancy week between 4 and 42'
			});
			return;
		}
		
		if(!isValidContactNumber(this.contact_number)) {
			$ionicPopup.alert({
				title: 'Incorrect contact',
			 	template: 'Please check your mobile number!'
			});
			return;
		}

		// send OTP
		sendOTP(this.contact_number);

		showOTPpopUp(this);
	};

});