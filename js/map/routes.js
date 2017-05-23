angular.module('map.routes', [
               'map.controllers', 'map.services'
               ])
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

.state('tab.map', {
    url: '/map',
    views: {
      'tab-map': {
        templateUrl: 'templates/tab-map.html',
        controller: 'MapCtrl'
      }
    }
  })


})
