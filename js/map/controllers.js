angular.module('map.controllers', [])

.controller('MapCtrl', function($scope,stationService,$http,mapService,$rootScope) {

     $scope.place={};
     var map=mapService.initMap();
//var map = new AMap.Map('container', {
//               resizeEnable: true,
//               zoom:11,
//               center: [116.397428, 39.90923]
//
//           });


     $rootScope.color=["#3366FF","#ff0000","#ccff00","#9900ff"];
     function showStation(){

          stationService.getStation(function(data){

             $scope.busLines=data;
             for(var j in data){
                 var line=data[j].busStationClients;
                 var lineArr = [];
                 for(var i in line){
                     lineArr[i]=[];
                     var m=line[i];
                     lineArr[i][0]=m.locationX;
                     lineArr[i][1]=m.locationY;
     //                console.log("m=");
     //                console.log(m.locationX);
     //                console.log(m.locationY);
                     var position=new AMap.LngLat(m.locationX,m.locationY);
                     var marker=mapService.addMark(map,position);
                 }
                     var polyline = mapService.polyline(map,lineArr,$rootScope.color[j]);

             }
          });
     }
     showStation();
     $scope.checkText=function(){
                 var place=$scope.place.name;
     //            console.log(place);
                 if(place!=null&&place!=''){
                       mapService.placeSearch(map,'panel',place);
                 }else{
     //                  mapService.citySearch(map);
                       map.clearMap();
                       showStation();
                 }
     }


//     $scope.$watch('name', function(newValue, oldValue) {
//            console.log(newValue+ '===' +oldValue);
//      });
});
