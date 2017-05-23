angular.module('station.routes', [
               'station.controllers', 'station.services'
               ])
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('tab.stations', {
      url: '/stations',
      views: {
        'tab-stations': {
          templateUrl: 'templates/tab-stations.html',
          controller: 'StationsCtrl'
        }
      }
    })

  .state('tab.station-user', {
      url: '/stations/:station',
      views: {
        'tab-stations': {
          templateUrl: 'templates/station-user.html',
          controller: 'StationUserCtrl'
        }
      }
    })

  .state('tab.rider', {
    url: '/rider',
    views: {
      'tab-rider': {
        templateUrl: 'templates/tab-rider.html',
        controller: 'RiderCtrl'
      }
    }
  })



})
