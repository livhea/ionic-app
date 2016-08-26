angular.module('starter.controllers', [])

.controller('MainAppController', function($scope, $window) {
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
	};

	$scope.feedBack = function() {
		var link = "mailto:info@livhea.com?subject=Feedback";
		$window.location.href = link;
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

function isValidName(value) {
	return isNaN(value) && (value.length >= 2);
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
function setHotlineUserInfo(name, email, phoneNumber, customData) {
	window.Hotline.updateUser({
		name: 			name,
		email: 			email,
		countryCode: 	'+91',
		phoneNumber: 	phoneNumber
	});

	// set custom user properties
	window.Hotline.updateUserProperties(customData);
}

function setDataFromFirebaseUser(UserService) {

	firebase.auth().onAuthStateChanged(function(firebaseUser) {
	  if (firebaseUser) {
	    // User is signed in.
	    console.log('A------1');

	    // save user data in firebase
	    UserService.getUser(function(user){
	    	// console.log('user--------->', JSON.stringify(user));
	    	firebase.database().ref('users/' + firebaseUser.uid).set(user);
	    });
		
		// set external id in hotline
	    window.Hotline.updateUser({
			externalId: firebaseUser.uid
		});
	  }
	});
}

/*
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

.controller('BlogController', function($scope, Blogs) {
	$scope.blogs = Blogs.all();
})

.controller('BlogDetailCtrl', function($scope, $stateParams, Blogs) {
	var blog = Blogs.get($stateParams.blogId);
	$scope.blog = blog;

  	$scope.thisCanBeusedInsideNgBindHtml = blog.content;
});
*/