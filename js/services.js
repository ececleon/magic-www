angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];
  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})
.service('myService', function($http,$rootScope ){

  this.url=function(){
      var my_android_url="http://10.25.156.190:8081/";
      var my_url='http://localhost:8081/';
      var http_url="http://10.25.156.247:8080/bus_tracker/spring/";
      return my_url;
  }
//
//  this.login = function(data,res){
//    var da={
//             'bankId':1,
//             'password':1
//             };
//     var config = {
//                   headers: {
//                       'Content-Type': "application/x-www-form-urlencoded"
//                   }
//               };
//          $http({
//          url:this.url()+"user/login",
//          method:'POST',
//          params:data
//          }).success(function (data) {
//              res(data);
//          });
//  }
//
//  this.register=function(data,res){
//      $http({
//                url:this.url()+"user/register",
//                method:'POST',
//                params:data
//      }).success(function (data) {
//              res(data);
//          });
//    }

  this.getStation=function(res){
      var url=this.url()+"buses/getallstations";
            $http({
                url:url,
                method:'GET'
            }).success(function(data){
                res(data);
       })
  }

  this.getStationUser=function(id,res){
      var url=this.url()+"buses/findbusstation";
            $http({
                url:url,
                method:'GET',
                params:{
                  'stationId':id
                }
            }).success(function(data){
                res(data.users);
       })
  }

  this.getAllUsers=function(res){
      var url=this.url()+"users/getallusers";
            $http({
                url:url,
                method:'GET'
            }).success(function(data){
                res(data);
       })
  }
})

.service('mapService', function($rootScope){

      this.initMap=function(){
            var AMapArea=document.getElementById('amap');
            AMapArea.parentNode.style.height="100%";
            var map = new AMap.Map('container', {
                   resizeEnable: true,
                   zoom:11,
                   center: [116.397428, 39.90923]

               });
            return map;
      };
      this.placeSearch=function(map,panel,keyname){
            map.clearMap();
            AMap.service(["AMap.PlaceSearch"], function() {
                  var placeSearch = new AMap.PlaceSearch({ //构造地点查询类
                      pageSize: 10,
                      pageIndex: 1,
                      city: "010", //城市
                      map: map,
                      panel: panel
                  });
                  //关键字查询
                  placeSearch.search(keyname);
             })
       };
      this.citySearch=function(map){
//            map.clearMap();
            AMap.service(["AMap.CitySearch"], function() {
                  //实例化城市查询类
                  var citysearch = new AMap.CitySearch();
                  //自动获取用户IP，返回当前城市
                  citysearch.getLocalCity(function(status, result) {
                      if (status === 'complete' && result.info === 'OK') {
                          if (result && result.city && result.bounds) {
                              var cityinfo = result.city;
                              var citybounds = result.bounds;
//                              document.getElementById('tip').innerHTML = '您当前所在城市：'+cityinfo;
//                              地图显示当前城市
                              map.setBounds(citybounds);
                              map.setZoom(10);
                          }
                        }
                  });
             });
       }
})



