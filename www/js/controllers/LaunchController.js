angular.module('starter.controllers')

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
});