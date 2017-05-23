angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,$ionicPopup) {

var AMapArea=document.getElementById('amap');

AMapArea.parentNode.style.height="100%";

$scope.AMapId='container';

$scope.mapObj;//存放初始化的地图对象

$scope.initAMap=function(){

var position=new AMap.LngLat(117.708567,39.02361);

$scope.mapObj=new AMap.Map($scope.AMapId,{

view:new AMap.View2D({

center:position,

zoom:17,

rotation:0

}),

lang:'zh_cn'

});

}

$scope.addCircle=function(){

//初始化待编辑的圆实例

var circle = new AMap.Circle({

map: $scope.mapObj,

center:new AMap.LngLat(117.708567,39.02361),

radius:100,

strokeColor:'#F33',

strokeOpacity:1,

strokeWeight:3,

fillColor:'#ee2200',

fillOpacity:0.35

});

//加载圆编辑插件

var circleEditor;

$scope.mapObj.plugin(["AMap.CircleEditor"],function(){

//实例化时指定地图对象

circleEditor = new AMap.CircleEditor($scope.mapObj,circle);

});

}

$scope.ListenClick=function(){

AMap.event.addListener($scope.mapObj,'click',function(e){

var lnglat=e.lnglat;
marker=new AMap.Marker({

map:$scope.mapObj,

position:e.lnglat,

icon:"http://webapi.amap.com/images/0.png",

offset:new AMap.Pixel(-10,-34)

// content:m

});

$scope.mapObj.setCenter(lnglat);

});

}

})

.controller('StationsCtrl', function($scope,$http,myService) {
    $scope.stations=myService.getStation(function(data){
          $scope.stations=data;
     });
})

.controller('StationUserCtrl', function($scope, $stateParams, $http,myService) {
    var url=myService.url()+"buses/findbusstation";
    var id=parseInt($stateParams.stationId);
    myService.getStationUser(id,function(data){
        $scope.users=data;
    });
 })
//
//.controller('loginCtrl11', function($scope,$state,$ionicPopup, $timeout,$http,userService,$rootScope) {
//      $scope.data = {};
//      $scope.register=function(){
//          $state.go('register');
//       }
//
//  $scope.login=function(){
//    userService.login($scope.data,function(data){
//        console.log(data.msg);
//        if(data.msg){
//           $rootScope.root=true;
//           $rootScope.user=data.user;
//           $state.go('tab.map');
////           $rootScope.root=false;
////           $state.go('admin.map');
//        }else{
////           $rootScope.root=true;
////           $state.go('tab.map');
//           //     alert（警告） 对话框
//              var alertPopup = $ionicPopup.alert({
//                title: '温馨提示',
//                template: '您的用户名或密码错误！'
//              });
//              alertPopup.then(function(res) {
//              });
//           };
//    });
//  };
//})
//
//.controller('MyInfoCtrl', function($scope,$state,$cordovaToast) {
//
//
//     $scope.logout = function(){
//           $state.go('login');
////           $cordovaToast
////               .show('ionic中文网', 'long', 'center')
////               .then(function(success) {
////                 // success
////               }, function (error) {
////                 // error
////               });
//     }
// })

.controller('RiderCtrl', function($scope, $http,myService) {
    myService.getAllUsers(function(data){
        $scope.users =data;
    });
 })

//
//.controller('RegisterCtrl', function($scope,myService,$state,$ionicPopup) {
//    $scope.user = {};
//    $scope.doRegister = function(){
//          myService.register($scope.user,function(data){
//              console.log(data);
//              if(data=='true'){
//                  $state.go('login');
//              }else{
//                  //     alert（警告） 对话框
//                   var alertPopup = $ionicPopup.alert({
//                     title: '温馨提示',
//                     template: '用户已注册！'
//                   });
//                   alertPopup.then(function(res) {
//                   });
//              }
//          });
//    }
//})

.controller('MapCtrl', function($scope,myService,$http,mapService) {

     $scope.place={};
     var map=mapService.initMap();
     $scope.onload_map=function(){
            var place=$scope.place.name;
//            console.log(place);
            if(place!=null&&place!=''){
                  mapService.placeSearch(map,'panel',place);
            }else{
//                  mapService.citySearch(map);
            }
     }
     myService.getStation(function(data){
        var lineArr = [];
        for(var i in data){
            lineArr[i]=[];
            var m=data[i];
            lineArr[i][0]=m.locationX;
            lineArr[i][1]=m.locationY;
            var marker=new AMap.Marker({
               icon:"http://webapi.amap.com/images/1.png",
               position:new AMap.LngLat(m.locationX,m.locationY),
               map:map
            });
        }

            var polyline = new AMap.Polyline({
                map:map,
                path: lineArr,          //设置线覆盖物路径
                strokeColor: "#3366FF", //线颜色
                strokeOpacity: 1,       //线透明度
                strokeWeight: 5,        //线宽
                strokeStyle: "solid",   //线样式
                strokeDasharray: [10, 5] //补充线样式
            });
     });
//     $scope.$watch('name', function(newValue, oldValue) {
//            console.log(newValue+ '===' +oldValue);
//      });
});

