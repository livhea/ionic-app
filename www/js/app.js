// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','ionic.service.core', 'ionic.service.analytics', 'starter.controllers', 'starter.services', 'firebase', 'chart.js', 'angularMoment'])
.run(function($ionicPlatform, $ionicAnalytics) {
    $ionicPlatform.ready(function() {

        // use ionic analytics
        $ionicAnalytics.register();

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

        var helpshiftAppId = 'livhea_platform_20160801163533010-9c4746eacfa9218';
        if (ionic.Platform.isIOS()) {
            helpshiftAppId = 'livhea_platform_20160727123716116-b102dadbed53db1';
        }

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

        facebookConnectPlugin.getLoginStatus(function(success) {
            if(success.status === 'connected') {
                console.log('CONNECTED');
            } else {
                console.log('NOT CONNECTED');
            }
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

    // setup an abstract state for the tabs directive
    .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
    })

    // Each tab has its own nav history stack:
    .state('tab.dash', {
        url: '/dash',
        views: {
            'tab-dash': {
                templateUrl: 'templates/tab-dash.html',
                controller: 'DashCtrl'
            }
        }
    })

    .state('tab.chats', {
        url: '/chats',
        views: {
            'tab-chats': {
                templateUrl: 'templates/tab-chats.html',
                controller: 'ChatsCtrl'
            }
        }
    })

    .state('tab.more', {
        url: '/more',
        views: {
            'tab-more': {
                templateUrl: 'templates/tab-more.html',
                controller: 'MoreCtrl'
            }
        }
    })

    .state('tab.more-detail', {
        url: '/more/:blogId',
        views: {
            'tab-more': {
                templateUrl: 'templates/blog-detail.html',
                controller: 'BlogDetailCtrl'
            }
        }
    })

    .state('tab.dash-addweight', {
        url: '/dash/addweight',
        views: {
            'tab-dash': {
                templateUrl: 'templates/add-weight.html',
                controller: 'WeightCtrl'
            }
        }
    })

    .state('tab.dash-addbloodpressure', {
        url: '/dash/addbloodpressure',
        views: {
            'tab-dash': {
                templateUrl: 'templates/add-bloodpressure.html',
                controller: 'BloodPressureCtrl'
            }
        }
    })

    console.log('window.localStorage.starter_facebook_user -->', window.localStorage.starter_facebook_user);
    // if none of the above states are matched, use this as the fallback
    if(window.localStorage.starter_facebook_user) {
        console.log('111 HERERERE');
        $urlRouterProvider.otherwise('/tab/dash');
    } else {
        console.log('222 HERERERE');
        $urlRouterProvider.otherwise('/launch');
    }
    // $urlRouterProvider.otherwise('/launchprofile');
    // $urlRouterProvider.otherwise('/tab/chats');
});
