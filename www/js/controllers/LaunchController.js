angular.module('starter.controllers')

.controller('LaunchController', function($scope, $state, $q, UserService, $ionicLoading, $ionicPopup, $firebaseAuth) {
 	$scope.facebookSignIn = function() {
 		$state.go('launchprofile');
	};
});