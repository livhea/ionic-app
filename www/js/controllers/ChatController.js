angular.module('starter.controllers')

.controller('ChatController', function($scope, $ionicLoading, $ionicPopup, $firebaseAuth, $cordovaNativeStorage) {

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
});