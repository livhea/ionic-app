angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
    $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
    $scope.series = ['Series A', 'Series B'];
    $scope.data = [
        [65, 59, 80, 81, 56, 55, 40],
        [28, 48, 40, 19, 86, 27, 90]
    ];
})

.controller('WeightCtrl', function($scope, $ionicPopup, $state, $firebaseAuth, $ionicHistory) {
  	$scope.$on('$ionicView.afterEnter', function(e) {
  		console.log('AFFAF');
  		console.log('firebase.auth().currentUser:', firebase.auth().currentUser);
  	});
	
	var monthNames = ["January", "February", "March", "April", "May", "June",
  		"July", "August", "September", "October", "November", "December"
	];

	var d = new Date();
	$scope.date = monthNames[d.getMonth()] + ' ' + d.getDay();
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

.controller('BloodPressureCtrl', function($scope, $ionicPopup, $state, $firebaseAuth, $ionicHistory) {
	var monthNames = ["January", "February", "March", "April", "May", "June",
  		"July", "August", "September", "October", "November", "December"
	];

	var d = new Date();
	$scope.date = monthNames[d.getMonth()] + ' ' + d.getDay();
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

.controller('ChatsCtrl', function($scope, $ionicLoading, $firebaseAuth) {
	$scope.showConversation = function() {
		console.log('-------> X1');
		console.log('-------> X2');

		  var isIOS = ionic.Platform.isIOS();
		  var isAndroid = ionic.Platform.isAndroid();



		$ionicLoading.show({
			template: 'Starting...'
		});
		console.log('-------> X3');

		var config = {
			"conversationPrefillText": "Connect with a pregnancy coach.",
			"hideNameAndEmail": "YES"
		};

		var userId = firebase.auth().currentUser.uid;
		firebase.database().ref('users/' + userId).once('value', function(snapshot) {
			console.log('A----->');
			console.log('snapshot', JSON.stringify(snapshot.val()));

			if(snapshot.val()) {
				var customMetadata = {
					age : snapshot.val().age,
					pregnant : snapshot.val().pregnant,
					contact_number : snapshot.val().contact_number,
					pregnancy_start_date: snapshot.val().pregnancy_start_date,
					expected_pregnancy_date: snapshot.val().expected_pregnancy_date
				}

				if(isIOS) {
					config["HelpshiftSupportCustomMetadataKey"] = customMetadata;
				} else {
					config["HSCUSTOMMETADATAKEY"] = customMetadata;
				}
				
			}

			console.log('config', JSON.stringify(config));
			$ionicLoading.hide();
			window.HelpshiftPlugin.showConversation(config);
		});
		console.log('-------> X5');
	};
})

.controller('MoreCtrl', function($scope, Blogs) {
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

	  		setHelpshiftInformation(profileInfo.name, profileInfo.email);
		  	// For the purpose of this example I will store user data on local storage
		 	UserService.setUser({
			  	authResponse: authResponse,
			  	userID: profileInfo.id,
			  	name: profileInfo.name,
			  	email: profileInfo.email,
			  	picture : "https://graph.facebook.com/" + authResponse.userID + "/picture?type=large"
		  	});

	 		console.log('T!-->window.localStorage.starter_facebook_user', JSON.stringify(window.localStorage.starter_facebook_user));
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

  	var setHelpshiftInformation = function(name, email) {
		// set user info for the helpshift
		window.HelpshiftPlugin.setNameAndEmail(name, email);
		window.HelpshiftPlugin.setUserIdentifier("APAC-02201-U1");
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
	
	var user = UserService.getUser();
	console.log('user-->', user);
	console.log('string user-->', JSON.stringify(user));
	$scope.pregnantLabel = 'Pregnant for weeks';
	$scope.pregnancy_status = 'pregnant';
	$scope.name = user.name || 'user';
	$scope.userOTP = {};
	$scope.retryCount = 0;

	var sendOTP = function(mobileNumber) {
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
				$scope.verification.verify(res, function() {
					console.log('successfully verified phone number');
					console.log('scopeRef.age: ', scopeRef.age);
					console.log('scopeRef.userOTP: ', JSON.stringify(scopeRef.userOTP));
					
					// move to next screen
					var data = {
						name: user.name || '',
						email: user.email || '',
						picture: user.picture || '',
						age: scopeRef.age,
						pregnant: scopeRef.pregnancy_status,
						contact_number: scopeRef.contact_number
					};

					var previousDate = moment().subtract($scope.week_track*7, 'days');
					previousDate = previousDate.format('LL');
					console.log('previousDate: ', previousDate);
					if($scope.pregnancy_status == 'pregnant') {
						data['pregnancy_start_date'] = previousDate;
					} else {
						data['expected_pregnancy_date'] = previousDate;
					}

					var firebaseUser = firebase.auth().currentUser;
					console.log('firebaseUser:', firebaseUser);
					firebase.database().ref('users/' + firebaseUser.uid).set(data);

					// move to new state
					$state.go('tab.dash');

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
		if(this.pregnancy_status == 'pregnant') {
			$scope.pregnantLabel = 'Pregnant for weeks';
		} else {
			$scope.pregnantLabel = 'Planning for pregnancy in weeks';
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

		if(!isValidPregnancyWeek(this.week_track)) {
			$ionicPopup.alert({
				title: 'Incorrect weeks',
			 	template: 'Please check weeks value!'
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
	return !isNaN(value) && (function(x) { return (x | 0) === x; })(parseFloat(value)) && (value >= 0 && value <= 42)
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