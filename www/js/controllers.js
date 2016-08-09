angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, Blogs) {
	$scope.blogs = Blogs.all();
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
.controller('LaunchController', function($scope, $state, $q, UserService, $ionicLoading, $ionicPopup) {
  // This is the success callback from the login method
	var fbLoginSuccess = function(response) {
	  	if (!response.authResponse){
	  		fbLoginError("Cannot find the authResponse");
	  		return;
	  	}

	  	var authResponse = response.authResponse;

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
				var user = UserService.getUser('facebook');
				console.log('user:', JSON.stringify(user));

				if(!user.userID){
				  // user is not saved, get user profile information and save it
					getFacebookProfileInfo(success.authResponse)
					.then(function(profileInfo) {

						// For the purpose of this example I will store user data on local storage
						UserService.setUser({
							authResponse: success.authResponse,
							userID: profileInfo.id,
							name: profileInfo.name,
							email: profileInfo.email,
							picture : "http://graph.facebook.com/" + success.authResponse.userID + "/picture?type=large"
						});
					}, function(fail){
						// Fail get profile info
						console.log('failed to get profile info, failure:', fail);
						fbLoginError('local error, failed to retrieve user data');
					});
				}

				setHelpshiftInformation(user.name, user.email);
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