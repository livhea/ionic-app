// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','ionic.service.core', 'ionic.service.analytics', 'starter.controllers', 'starter.services', 'firebase', 'chart.js', 'angularMoment', 'ngCordova.plugins.nativeStorage'])
.run(function($ionicPlatform, $ionicAnalytics, $cordovaNativeStorage, $state) {
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
        controller: 'AppController'
    })

    .state('app.dash', {
        url: '/dash',
        views: {
            'menuContent': {
                templateUrl: 'templates/app-dash.html',
                controller: 'DashCtrl'
            }
        }
    })

    .state('app.chats', {
        url: '/chats',
        views: {
            'menuContent': {
                templateUrl: 'templates/app-chats.html',
                controller: 'ChatsCtrl'
            }
        }
    })

    .state('app.track', {
        url: '/track',
        views: {
            'menuContent': {
                templateUrl: 'templates/app-track-pregnancy.html',
                controller: 'WeekTracker'
            }
        }
    })

    .state('app.blog', {
        url: '/blog',
        views: {
            'menuContent': {
                templateUrl: 'templates/app-blog.html',
                controller: 'BlogController'
            }
        }
    })

    .state('app.blog-detail', {
        url: '/blog/:blogId',
        views: {
            'menuContent': {
                templateUrl: 'templates/blog-detail.html',
                controller: 'BlogDetailCtrl'
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
    })
    
    .state('app.dash-addweight', {
        url: '/dash/addweight',
        views: {
            'menuContent': {
                templateUrl: 'templates/add-weight.html',
                controller: 'WeightCtrl'
            }
        }
    })

    .state('app.dash-addbloodpressure', {
        url: '/dash/addbloodpressure',
        views: {
            'menuContent': {
                templateUrl: 'templates/add-bloodpressure.html',
                controller: 'BloodPressureCtrl'
            }
        }
    });
    // $urlRouterProvider.otherwise('/launchprofile');
    $urlRouterProvider.otherwise('/app/chats');
});
