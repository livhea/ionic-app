// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','ionic.service.core', 'ionic.service.analytics', 'starter.controllers', 'starter.services', 'firebase', 'chart.js', 'angularMoment', 'ngCordova.plugins.nativeStorage'])
.run(function($ionicPlatform, $ionicAnalytics, $cordovaNativeStorage, $state, $ionicPopup) {
    $ionicPlatform.ready(function() {

        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }

        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }

        window.livheaDebug = false;
        if(!window.livheaDebug) {
            console.log('-----------> LIVE');
            // use ionic analytics
            $ionicAnalytics.register();

            // Initializing Hotline sdk
            window.Hotline.init({
                appId                   : "86abb378-eba3-4f5e-b8a1-0ed7881512a5",
                appKey                  : "e23c6efa-a49e-4dff-8805-f0d255320279",
                agentAvatarEnabled      : true,
                cameraCaptureEnabled    : false,
                voiceMessagingEnabled   : true,
                pictureMessagingEnabled : true
            }, function(success){
                console.log("This is called form the init callback");
                console.log('hotline sdk initialized');
            });
        } else {
            console.log('-----------> DEBUG');

            $ionicPopup.alert({
                title: 'Test build',
                template: 'This is a debug/test build.'
            });

            // Initializing Hotline sdk
            window.Hotline.init({
                appId                   : "49f9934d-2dec-452d-b606-fd5823fc08ba",
                appKey                  : "a7363b31-7cc8-4ccc-b449-670edf6a8edf",
                agentAvatarEnabled      : true,
                cameraCaptureEnabled    : false,
                voiceMessagingEnabled   : true,
                pictureMessagingEnabled : true
            }, function(success){
                console.log("This is called form the init callback");
                console.log('hotline sdk initialized');
            });
        }

        $cordovaNativeStorage.getItem("user_data")
        .then(function (value) {
            // console.log('-------config 1-->', value);
            if(value) {
                $state.go('app.chats');
            } else {
                $state.go('launch');
            }
            
        }, function (error) {
            // console.log('-------config error-->', JSON.stringify(error));
            $state.go('launch');
        });
    });
})

.config(function($stateProvider, $urlRouterProvider) {
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    // setup a state for launch screen
    .state('launch', {
        url: '/launch',
        // abstract: true,
        templateUrl: 'templates/launch.html',
        controller: 'LaunchController'
    })

    .state('launchprofile', {
        url: '/launchprofile',
        // abstract: true,
        templateUrl: 'templates/launchprofile.html',
        controller: 'ProfileController'
    })

    .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'MainAppController'
    })

    .state('app.chats', {
        url: '/chats',
        views: {
            'menuContent': {
                templateUrl: 'templates/app-chats.html',
                controller: 'ChatController'
            }
        }
    })

    .state('app.track', {
        url: '/track',
        views: {
            'menuContent': {
                templateUrl: 'templates/app-track-pregnancy.html',
                controller: 'WeekTrackController'
            }
        }
    })

    .state('app.contact', {
        url: '/contact',
        views: {
            'menuContent': {
                templateUrl: 'templates/app-contact-us.html',
                controller: ''
            }
        }
    })

    .state('app.about', {
        url: '/about',
        views: {
            'menuContent': {
                templateUrl: 'templates/app-about-us.html',
                controller: ''
            }
        }
    });
    // $urlRouterProvider.otherwise('/launchprofile');
    // $urlRouterProvider.otherwise('/app/chats');
});
