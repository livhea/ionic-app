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

.controller('ChatsCtrl', function($scope) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  // $scope.$on('$ionicView.enter', function(e) {
  // });

  // $scope.$on('$viewContentLoaded', function() {
  //     //call it here
  //     window.HelpshiftPlugin.showConversation();
  // });

	$scope.showConversation = function() {
		console.log('chats controller showConversation()');
		var config = {
			"conversationPrefillText": "Hi Swapnil here, How can I of assistance ?",
			"hideNameAndEmail": "YES"
		};
		window.HelpshiftPlugin.showConversation(config);
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

// .controller('LaunchController', function($scope, $state) {

//   $scope.loginWithFacebook = function(){
//     console.log('loginWithFacebook');
//     $state.go('tab.dash');
//   };

//   $scope.skipLogin = function(){
//     console.log('skipLogin');
//     $state.go('tab.dash');
//   };


//   $scope.settings = {
//     enableFriends: true
//   };
// })

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
		      	// $ionicLoading.hide();
         //    	$state.go('tab.dash');
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
		  $ionicLoading.hide();
		  $state.go('tab.dash');
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
		 	template: 'Sorry, an error occurred. Please try again.'
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
				$state.go('tab.dash');

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
});

function isValidBP(value) {
  return !isNaN(value) && (function(x) { return (x | 0) === x; })(parseFloat(value)) && (value > 0 && value <= 400)
}

function isValidWeight(value) {
  return !isNaN(value) && (function(x) { return (x | 0) === x; })(parseFloat(value)) && (value > 0 && value <= 1000)
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