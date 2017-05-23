
angular.module('starter', ['ionic',
                'user.routes',
                'map.routes',
                'station.routes',
                'bus.util',
                'ngCordova'])

.run(function($ionicPlatform,$rootScope,$location,$state) {

    $rootScope.$on("$locationChangeStart", function () {
              //监听url变化，在变化前做想要的处理
              console.log('user:',$rootScope.user);
              if($rootScope.user==null&& $location.path()!='/register'){
                  $state.go('login');
              }
    });
//  $rootScope.station_update=true;


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
  });




})
.run(function ($ionicPlatform, $ionicPopup, $rootScope, $location,util,$ionicHistory) {

        //主页面显示退出提示框
        $ionicPlatform.registerBackButtonAction(function (e) {

            e.preventDefault();

            function showConfirm() {
                var confirmPopup = $ionicPopup.confirm({
                    title: '<strong>退出应用?</strong>',
                    template: '你确定要退出应用吗?',
                    okText: '退出',
                    cancelText: '取消'
                });

                confirmPopup.then(function (res) {
                    if (res) {
                        ionic.Platform.exitApp();
                    } else {
                        // Don't close
                    }
                });
            }
            // Is there a page to go back to?
            if ($location.path() == '/tab/map'|| $location.path() == '/tab/stations'|| $location.path() == '/tab/rider'|| $location.path() == '/tab/myinfo') {
                showConfirm();
//            } else if ($rootScope.$viewHistory.backView ) {
            } else{
                $ionicHistory.goBack();
//                util.showLog($rootScope.$viewHistory.backView);
//                console.log('currentView:', $rootScope.$viewHistory.currentView);
//                // Go back in history
//                $rootScope.$viewHistory.backView.go();
            }
//            else {
//                // This is the last page: Show confirmation popup
//                showConfirm();
//            }

            return false;
        }, 101);

    })

.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {


$ionicConfigProvider.tabs.position('bottom');
  $stateProvider

 .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

//
//.state('login', {
//      url: '/login',
//          templateUrl: 'templates/login.html',
//          controller: 'loginCtrl'
//    })
//
//.state('register', {
//      url: '/register',
//      templateUrl: 'templates/register.html',
//      controller: 'RegisterCtrl'
// })

  // Each tab has its own nav history stack:

//  .state('tab.map', {
//    url: '/map',
//    views: {
//      'tab-map': {
//        templateUrl: 'templates/tab-map.html',
//        controller: 'MapCtrl'
//      }
//    }
//  })
//
//  .state('tab.myinfo', {
//         url: '/myinfo',
//         views: {
//         'tab-myinfo': {
//            templateUrl: 'templates/tab-myinfo.html',
//            controller: 'MyInfoCtrl'
//            }
//         }
//  })
//
//  .state('tab.stations', {
//      url: '/stations',
//      views: {
//        'tab-stations': {
//          templateUrl: 'templates/tab-stations.html',
//          controller: 'StationsCtrl'
//        }
//      }
//    })
//
//    .state('tab.station-user', {
//      url: '/stations/:stationId',
//      views: {
//        'tab-stations': {
//          templateUrl: 'templates/station-user.html',
//          controller: 'StationUserCtrl'
//        }
//      }
//    })
//
//  .state('tab.rider', {
//    url: '/rider',
//    views: {
//      'tab-rider': {
//        templateUrl: 'templates/tab-rider.html',
//        controller: 'RiderCtrl'
//      }
//    }
//  })





  .state('admin', {
    url: '/admin',
    abstract: true,
    templateUrl: 'templates/admins.html'
  })

  .state('admin.map', {
    url: '/map',
    views: {
      'admin-map': {
        templateUrl: 'templates/tab-map.html',
        controller: 'MapCtrl'
      }
    }
  })

  .state('admin.myinfo', {
         url: '/myinfo',
         views: {
         'admin-myinfo': {
            templateUrl: 'templates/tab-myinfo.html',
            controller: 'MyInfoCtrl'
            }
         }
  })
  // if none of the above states are matched, use this as the fallback
//  $urlRouterProvider.otherwise('/login');

});
