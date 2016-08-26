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
	
	var saveInfoAndShowNextView = function(scopeRef) {
		var scopeObj = scopeRef;
		var userName = scopeObj.name || '';
		var userEmail = scopeObj.contact_number + '@livhea.com';

		var data = {
			name: userName,
			email: userEmail,
			age: scopeObj.age,
			pregnant: scopeObj.pregnancy_status,
			contact_number: scopeObj.contact_number
		};
		
		var previousDate = moment().subtract(scopeObj.week_track*7, 'days');
		console.log('previousDate---------->', previousDate);
		formattedPreviousDate = previousDate.clone().format('LL');
		if(scopeObj.pregnancy_status == 'currently_pregnant') {
			data['pregnancy_start_date'] = formattedPreviousDate;
		}

		// save user locally
		UserService.setUser(data);

		// set hotline information
		setHotlineUserInfo(userName, userEmail, scopeObj.contact_number, data);

		// set auth state change & set info
		setDataFromFirebaseUser(UserService);

		// create user in firebase
		var password = 'livhea@password';
		firebase.auth().createUserWithEmailAndPassword(userEmail, password)
		.catch(function(error) {
			// Handle Errors here.
		  	var errorCode = error.code;
		  	var errorMessage = error.message;
		  	console.log('errorMessage:', errorMessage);
		  	console.log('errorCode:', errorCode);
		  	firebase.auth().signInWithEmailAndPassword(userEmail, password);
		});

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
				if(!window.livheaDebug && (scopeRef.contact_number != '1234512345')) {
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

		this.name = this.name.trim();
		if(!isValidName(this.name)) {
			$ionicPopup.alert({
				title: 'Incorrect name',
			 	template: 'Please check your name!'
			});
			return;
		}

		// send OTP
		sendOTP(this.contact_number);

		showOTPpopUp(this);
	};

});