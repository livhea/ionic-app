// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'firebase', 'chart.js'])
.run(function($ionicPlatform) {
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

        var helpshiftAppId = 'livhea_platform_20160801163533010-9c4746eacfa9218';
        if (ionic.Platform.isIOS()) {
            helpshiftAppId = 'livhea_platform_20160727123716116-b102dadbed53db1';
        }

        // Initializing HelpShift sdk
        var helpshiftConfig = {
            "disableEntryExitAnimations": "YES", 
            "requireEmail": "NO",
            "hideNameAndEmail": "YES",
            "conversationPrefillText": "Hi Swapnil here, How can I of assistance ?"
        };

        window.HelpshiftPlugin.install("e86b51fb7b165e636ab022fcbb9e3703", 
                                        "livhea.helpshift.com", 
                                        helpshiftAppId, 
                                        helpshiftConfig);

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

});
