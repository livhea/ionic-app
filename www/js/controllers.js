angular.module('starter.controllers', [])

.controller('AppController', function($scope, $window) {
	$scope.rateApp = function() {
		AppRate.preferences.storeAppURL = {
		  ios: '1145733430',
		  android: 'market://details?id=com.livhea.app.android'
		};

		AppRate.promptForRating();
	};

	$scope.contactUs = function() {

		 var link = "mailto:info@livhea.com?subject=ContactUs";
		 $window.location.href = link;
		// cordova.plugins.email.open({
		//     to:      'info@livhea.com',
		//     // cc:      'erika@mustermann.de',
		//     // bcc:     ['john@doe.com', 'jane@doe.com'],
		//     subject: 'Contact Us',
		//     // body:    'How are you? Nice greetings from Leipzig'
		// });
	};

	$scope.feedBack = function() {
		var link = "mailto:info@livhea.com?subject=Feedback";
		$window.location.href = link;
		// cordova.plugins.email.open({
		//     to:      'info@livhea.com',
		//     // cc:      'erika@mustermann.de',
		//     // bcc:     ['john@doe.com', 'jane@doe.com'],
		//     subject: 'Feedback',
		//     // body:    'How are you? Nice greetings from Leipzig'
		// });
	};

	$scope.openBlog = function() {
		var options = {
		    location: 'yes',
		    clearcache: 'yes',
		    toolbar: 'no'
		};

		cordova.InAppBrowser.open('http://blog.livhea.com', '_blank', 'location=yes');
	}
})

.controller('WeekTracker', function($scope, WeekTrack, UserService, moment) {
	
	var _this = $scope;
	_this.prev_week = null;
	_this.curr_week = 4;
	_this.next_week = 5;
	_this.mother_text = '';
	_this.baby_text = '';

	var calculateNextAndPrevWeek = function() {
		_this.prev_week = null;
		_this.next_week = null;

		console.log('current week --->', _this.curr_week);
		if(_this.curr_week > 4) {
			_this.prev_week = _this.curr_week - 1;
		}
		if(_this.curr_week < 42) {
			_this.next_week = _this.curr_week + 1;
		}

		if(_this.curr_week != 4) {
			_this.prev_week_show = '<Week ' + ("0" + _this.prev_week).slice(-2);
		}
		
		if(_this.curr_week != 42) {
			_this.next_week_show = 'Week ' + ("0" + _this.next_week).slice(-2) + '>';
		}
		
		_this.curr_week_show = 'Week ' + ("0" + _this.curr_week).slice(-2);

	};

	var getWeekAndShowData = function() {
		var week = _this.curr_week;
		var data = WeekTrack.getTrackerForWeek(week.toString());
		_this.mother_text = data['motherText'];
		_this.baby_text = data['babyText'];
	};

	UserService.getUser(function(userObj){
		var startDate = userObj['pregnancy_start_date'];

		if(startDate) {
			// if startDate is present, means user is pregnant.
			// calculate current pregnancy week

			startDate = moment(startDate);

			//get todays date
            var today = moment();
            _this.curr_week =  today.diff(startDate, 'week');
		}

		calculateNextAndPrevWeek();
		getWeekAndShowData();

	}, function(){
		// console.log('userObj-----------> ERROR');
		getWeekAndShowData();
	});

  	$scope.showPrev = function(){
  		if(_this.prev_week == null) {
  			return;
  		}
  		_this.curr_week -= 1;
  		calculateNextAndPrevWeek();
  		getWeekAndShowData();
  	};

  	$scope.showNext = function(){
  		if(_this.next_week == null) {
  			return;
  		}
  		_this.curr_week += 1;
  		calculateNextAndPrevWeek();
  		getWeekAndShowData();
  	};
})

.controller('DashCtrl', function($scope) {
    $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
    $scope.series = ['Series A', 'Series B'];
    $scope.data = [
        [65, 59, 80, 81, 56, 55, 40],
        [28, 48, 40, 19, 86, 27, 90]
    ];
})

.controller('WeightCtrl', function($scope, $ionicPopup, $state, $firebaseAuth, $ionicHistory, moment) {
  	$scope.$on('$ionicView.afterEnter', function(e) {
  		console.log('AFFAF');
  		console.log('firebase.auth().currentUser:', firebase.auth().currentUser);
  	});
	
	var d = new Date();
	$scope.date = moment().format("MMM Do");
	$scope.weight = null;

	$scope.saveWeight = function() {
		console.log('saving weight: ' , this.weight)
		if (!isValidWeight(this.weight)) {
			$ionicPopup.alert({
				title: 'Incorrect value',
			 	template: 'Please check the weight!'
			});
			return;
		}

		var user = firebase.auth().currentUser;
		// console.log('uid: ', JSON.stringify(user));
		var data = {};
		data[d] = {
			weight: this.weight
		}
		firebase.database().ref('users/' + user.uid + '/user-weight').push(data);
		
		// go back to dash view
		$ionicHistory.goBack();
	};
})

.controller('BloodPressureCtrl', function($scope, $ionicPopup, $state, $firebaseAuth, $ionicHistory, moment) {
	
	var d = new Date();
	$scope.date = moment().format("MMM Do");
	$scope.systolic = null;
	$scope.diastolic = null;
	$scope.saveBP = function() {
		if (!isValidBP(this.systolic)) {
			$ionicPopup.alert({
				title: 'Incorrect value',
			 	template: 'Please check systolic value!'
			});
			return;
		}

		if (!isValidBP(this.diastolic)) {
			$ionicPopup.alert({
				title: 'Incorrect value',
			 	template: 'Please check diastolic value!'
			});
			return;
		}
		
		var user = firebase.auth().currentUser;
		// console.log('uid: ', JSON.stringify(user));
		var data = {};
		data[d] = {
			systolic: this.systolic,
			diastolic: this.diastolic
		};
		firebase.database().ref('users/' + user.uid + '/user-bp').push(data);

		// go back to dash view
		$ionicHistory.goBack();
	};
})

.controller('ChatsCtrl', function($scope, $ionicLoading, $ionicPopup, $firebaseAuth, $cordovaNativeStorage) {

	$cordovaNativeStorage.getItem("chat_use")
    .then(function (value) {
        if(value) {
        	$scope.chatLabel = 'Continue Chat';
        } else {
        	$scope.chatLabel = 'Start Chat';
        }
        
    }, function (error) {
        $scope.chatLabel = 'Start Chat';
    });

	var askPushPermission = function() {
		window.Hotline.registerPushNotification('211882719686')
    	window.Hotline.showConversations();
	};

	var askPushPermissionAndStartConversation = function() {
		// mark that user has started conversation atleast once
		$cordovaNativeStorage.setItem("chat_use", 'started');

		// change chat label,
		// label gets changed for first time, when user initiates a chat
		$scope.chatLabel = 'Continue Chat';


		if(ionic.Platform.isIOS()) {
			var alertPopup = $ionicPopup.alert({
				title: 'Allow Notifications',
			 	template: 'You will be prompted to allow notifications. Please allow that, so your coach can message you, while you are offline.'
			});

			alertPopup.then(function(res) {
     			askPushPermission();
   			});
		} else {
			console.log('-------------------> GOING TO REGISTER FOR ANDROID NOTIFICATION')
			// start conversation
			askPushPermission();
		}
	};

	$scope.showConversation = function() {
		$cordovaNativeStorage.getItem("chat_use")
        .then(function (value) {
        	console.log('---------> T1 value', value);

        	if(value) {
				// start conversation
				window.Hotline.showConversations();
        	} else {
        		askPushPermissionAndStartConversation();
        	}

        }, function (error) {
            console.log(error);
            askPushPermissionAndStartConversation();
        });
	};
})

.controller('BlogController', function($scope, Blogs) {
	$scope.blogs = Blogs.all();
})

.controller('BlogDetailCtrl', function($scope, $stateParams, Blogs) {
	var blog = Blogs.get($stateParams.blogId);
  $scope.blog = blog;

  $scope.thisCanBeusedInsideNgBindHtml = blog.content;
})

// https://ionicthemes.com/tutorials/about/native-facebook-login-with-ionic-framework
.controller('LaunchController', function($scope, $state, $q, UserService, $ionicLoading, $ionicPopup, $firebaseAuth) {
	console.log('firebase.auth().currentUser:', firebase.auth().currentUser);
  // This is the success callback from the login method
	var fbLoginSuccess = function(event) {
	  	if (!event.authResponse){
	  		fbLoginError("Cannot find the authResponse");
	  		return;
	  	}

		  if (event.authResponse) {
		    // User is signed-in Facebook.
		    var unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser) {
		    	console.log('1 firebaseUser', firebaseUser);
		      	unsubscribe();
		      	// Check if we are already signed-in Firebase with the correct user.
		      	if (!isUserEqual(event.authResponse, firebaseUser)) {
		        	// Build Firebase credential with the Facebook auth token.
		      		var credential = firebase.auth.FacebookAuthProvider.credential(event.authResponse.accessToken);
			        // Sign in with the credential from the Facebook user.
			        firebase.auth().signInWithCredential(credential).catch(function(error) {
			        	// Handle Errors here.
			          	var errorCode = error.code;
				        var errorMessage = error.message;
				        // The email of the user's account used.
				        var email = error.email;
				        // The firebase.auth.AuthCredential type that was used.
				        var credential = error.credential;
				        // ...
			        });
		      	}
		      	console.log('firebaseUser:', JSON.stringify(firebase.auth().currentUser));
		    });

		} else {
		    // User is signed-out of Facebook.
		    firebase.auth().signOut();
		}

	  	var authResponse = event.authResponse;

	  	getFacebookProfileInfo(authResponse)
	  	.then(function(profileInfo) {
	  		console.log('profileInfo:', profileInfo);
		  	// For the purpose of this example I will store user data on local storage
		 	UserService.setUser({
			  	authResponse: authResponse,
			  	userID: profileInfo.id,
			  	name: profileInfo.name,
			  	email: profileInfo.email,
			  	picture : "https://graph.facebook.com/" + authResponse.userID + "/picture?type=large"
		  	});

		  	$ionicLoading.hide();
		  	$state.go('launchprofile');

		}, function(fail){
		  	// Fail get profile info
			console.log('profile info fail', fail);
		});
  	};

  	// This is the fail callback from the login method
	var fbLoginError = function(error){
	  	console.log('fbLoginError', error);
	  	$ionicLoading.hide();

		var alertPopup = $ionicPopup.alert({
			title: 'Facebook Login',
		 	template: JSON.stringify(error)//'Sorry, an error occurred. Please try again.'
		});

		alertPopup.then(function(res) {
		 	console.log('Thank you for not eating my delicious ice cream cone');
		});

  	};

  	// This method is to get the user profile info from the facebook api
	var getFacebookProfileInfo = function (authResponse) {
	  	var info = $q.defer();

	  	facebookConnectPlugin.api('/me?fields=email,name&access_token=' + authResponse.accessToken, null,
	  		function (response) {
	  			console.log(response);
	  			info.resolve(response);
	  		},
	  		function (response) {
	  			console.log(response);
	  			info.reject(response);
	  		}
	  	);
	  	return info.promise;
  	};

  	//This method is executed when the user press the "Login with facebook" button
 	$scope.facebookSignIn = function() {
  		facebookConnectPlugin.getLoginStatus(function(success){
	  		if(success.status === 'connected') {
				// The user is logged in and has authenticated your app, and response.authResponse supplies
				// the user's ID, a valid access token, a signed request, and the time the access token
				// and signed request each expire
				console.log('getLoginStatus', success.status);

				// Check if we have our user saved
				$state.go('launchprofile');

			} else {
				// If (success.status === 'not_authorized') the user is logged in to Facebook,
				// but has not authenticated your app
				// Else the person is not logged into Facebook,
				// so we're not sure if they are logged into this app or not.

				console.log('getLoginStatus', success.status);

				$ionicLoading.show({
					template: 'Logging in...'
				});

				// Ask the permissions you need. You can learn more about
				// FB permissions here: https://developers.facebook.com/docs/facebook-login/permissions/v2.4
				facebookConnectPlugin.login(['email', 'public_profile'], fbLoginSuccess, fbLoginError);
			}
		});
	};
})

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
	
	var sendOTP = function(mobileNumber) {
		//todo
		// return;
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
	}

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
				
				// trigger verify call with server
				//todo
				$scope.verification.verify(res, function() {
					console.log('successfully verified phone number');
					console.log('scopeRef.age: ', scopeRef.age);
					console.log('scopeRef.userOTP: ', JSON.stringify(scopeRef.userOTP));
					
					var userName = scopeRef.user.name || '';
					var userEmail = scopeRef.user.email || '';
					var userPicture = scopeRef.user.picture || '';
					// move to next screen
					var data = {
						name: userName,
						email: userEmail,
						picture: userPicture,
						age: scopeRef.age,
						pregnant: scopeRef.pregnancy_status,
						contact_number: scopeRef.contact_number
					};

					var hotlineCustomData = {
						age: scopeRef.age,
						pregnant: scopeRef.pregnancy_status
					};
					
					var previousDate = moment().subtract(scopeRef.week_track*7, 'days');
					console.log('previousDate---------->', previousDate);
					formattedPreviousDate = previousDate.clone().format('LL');
					if(scopeRef.pregnancy_status == 'currently_pregnant') {
						data['pregnancy_start_date'] = formattedPreviousDate;
						hotlineCustomData['pregnancy_start_date'] = formattedPreviousDate;

						// save pregnancy start date in local data
						scopeRef.user['pregnancy_start_date'] = previousDate;
						UserService.setUser(scopeRef.user);
					}

					var firebaseUser = firebase.auth().currentUser;
					console.log('firebaseUser:', firebaseUser);
					firebase.database().ref('users/' + firebaseUser.uid).set(data);


					// set hotline information
					setHotlineUserInfo(userName, userEmail, firebaseUser.uid, scopeRef.contact_number, hotlineCustomData);

					// move to new state
					$state.go('app.chats');

				//todo
				}, function() {

					scopeRef.retryCount++;
					console.log('phone number not verified');
					// show error alert and ask to verify again
					$ionicPopup.alert({
						title: 'OTP Error',
					 	template: 'System failed to verify your phone number. Please try again!'
					});
				});
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

function isValidBP(value) {
	return !isNaN(value) && (function(x) { return (x | 0) === x; })(parseFloat(value)) && (value > 0 && value <= 400)
}

function isValidWeight(value) {
	return !isNaN(value) && (function(x) { return (x | 0) === x; })(parseFloat(value)) && (value > 0 && value <= 1000)
}

function isValidAge(value) {
	return !isNaN(value) && (function(x) { return (x | 0) === x; })(parseFloat(value)) && (value > 12 && value <= 70)
}

function isValidPregnancyWeek(value) {
	return !isNaN(value) && (function(x) { return (x | 0) === x; })(parseFloat(value)) && (value >= 4 && value <= 42)
}

function isValidContactNumber(value) {
	return !isNaN(value) && (value.match(/\d/g).length===10);
}

function isUserEqual(facebookAuthResponse, firebaseUser) {
  if (firebaseUser) {
    var providerData = firebaseUser.providerData;
    for (var i = 0; i < providerData.length; i++) {
      if (providerData[i].providerId === firebase.auth.FacebookAuthProvider.PROVIDER_ID &&
          providerData[i].uid === facebookAuthResponse.userID) {
        // We don't need to re-auth the Firebase connection.
        return true;
      }
    }
  }
  return false;
}

// set hotline information
function setHotlineUserInfo(name, email, firebaseUserId, phoneNumber, customData) {
	
	window.Hotline.updateUser({
		name: 			name,
		email: 			email,
		externalId: 	firebaseUserId,
		countryCode: 	'+91',
		phoneNumber: 	phoneNumber
	});

	// set custom user properties
	window.Hotline.updateUserProperties(customData);
}