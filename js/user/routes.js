angular.module('user.routes', [
               'user.controllers', 'user.services'
               ])
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('login', {
        url: '/login',
            templateUrl: 'templates/login.html',
            controller: 'loginCtrl'
      })

  .state('register', {
        url: '/register',
        templateUrl: 'templates/register.html',
        controller: 'RegisterCtrl'
   })

  .state('tab.myinfo', {
         url: '/myinfo',
         views: {
         'tab-myinfo': {
            templateUrl: 'templates/tab-myinfo.html',
            controller: 'MyInfoCtrl'
            }
         }
  })
  .state('tab.qrcode', {
           url: '/myinfo/qrcode',
           views: {
           'tab-myinfo': {
              templateUrl: 'templates/test.html',
              controller: 'QrcodeCtrl'
              }
           }
    })
  .state('tab.adduserstation', {
         url: '/myinfo/adduserstation',
         views: {
             'tab-myinfo': {
                 templateUrl: 'templates/adduserstation.html',
                 controller: 'AddUserStationCtrl'
                 }
               }
  })

  $urlRouterProvider.otherwise('/login');


})
