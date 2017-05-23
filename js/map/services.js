angular.module('map.services', [])

.service('mapService', function($http,$rootScope,util){

  this.initMap=function(){
//        var AMapArea=document.getElementById('amap');
//        AMapArea.parentNode.style.height="100%";
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
//              placeSearch.search(keyname,function(status, result){
//                  util.saveJson('search_map',result);
//              });

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

  this.locationSearch=function(map){

  }

  this.addMark=function(map,position){
      var marker=new AMap.Marker({
         icon:"http://webapi.amap.com/images/1.png",
         position:position,
         map:map
      });
      return marker;
  }

  this.polyline=function(map,lineArr,color){
      var polyline = new AMap.Polyline({
          map:map,
          path: lineArr,          //设置线覆盖物路径
          strokeColor: color, //线颜色
          strokeOpacity: 1,       //线透明度
          strokeWeight: 5,        //线宽
          strokeStyle: "solid",   //线样式
          strokeDasharray: [10, 5] //补充线样式
      });
      return polyline;
  }



})
