angular.module('user.controllers', [])

.controller('loginCtrl', function($scope,$state,$ionicPopup, $timeout,$http,stationService,userService,$rootScope,util,locals) {
      $scope.data = {};
      $scope.register=function(){
          $state.go('register');
       }
       var c_user=locals.getObject('c_user');
   if(!angular.equals({},c_user)){
       $rootScope.user=c_user;
       userService.getMyStation();
       $state.go('tab.map');
   }

  $scope.login=function(){
    userService.login($scope.data,function(data){
        console.log(data);
        if(data.msg){
           $rootScope.root=true;
           $rootScope.user=data;
           userService.getMyStation();
//           stationService.getStation(function(data){
//                      $rootScope.busLines=data;
//                 });
           locals.setObject('c_user',data);
           $state.go('tab.map');
//           $rootScope.root=false;
//           $state.go('admin.map');
        }else{
//           $rootScope.root=true;
//           $state.go('tab.map');
           //     alert（警告） 对话框
              var alertPopup = $ionicPopup.alert({
                title: '温馨提示',
                template: '您的用户名或密码错误！'
              });
              alertPopup.then(function(res) {
              });
           };
    });
  };
})

.controller('RegisterCtrl', function($scope,userService,$state,$ionicPopup) {
    $scope.user = {};
    $scope.doRegister = function(){
          userService.register($scope.user,function(data){
              console.log(data);
              if(data==true){
                  $state.go('login');
              }else{
                  //     alert（警告） 对话框
                   var alertPopup = $ionicPopup.alert({
                     title: '温馨提示',
                     template: '用户已注册！'
                   });
                   alertPopup.then(function(res) {
                   });
              }
          });
    }
})

.controller('QrcodeCtrl', function($scope,$rootScope,$state,$ionicPopup,stationService,userService) {
     var qrcode = new QRCode('qrcode', {
         width : 200,
         height : 200,
         colorDark: '#123'

     });
     var elText = qrcode;
     console.log(elText);
//     qrcode.makeCode(JSON.stringify(elText));
     qrcode.makeCode(elText);
})

.controller('MyInfoCtrl', function($scope,$rootScope,$state,$ionicPopup,stationService,userService,locals) {


$scope.addstation = function(){
    $state.go('tab.adduserstation');
}
$scope.showConfirm = function() {
    var confirmPopup = $ionicPopup.confirm({
          title: 'Consume Register',
                 template: 'Are you sure register'
    });
    confirmPopup.then(function(res) {
           if(res) {
                 locals.deleteObject('c_user');
                 $state.go('login');
           }
      });
  }
  $scope.show = function() {
            $state.go("tab.qrcode");
    }

//     $scope.logout = function(){
//           $state.go('login');
//     }
//     var isNotFirst=false;
//     function getQrcode(){
////        if($rootScope.user==null)return;
//
//         if(isNotFirst)return true;
//          if($rootScope.user==null) {
//           // 为空
//           if(angular.equals({}, $rootScope.user)) {
//                                // 为空
//                                console.log(222);
//                     return false;
//                               }
//                     return false;
//          }
//        isNotFirst=true;
//        var qrcode = new QRCode('qrcode', {
//                        width : 150,
//                        height : 150,
//                        colorDark: '#123'
//
//        });
//        console.log($rootScope.user);
//        var elText = $rootScope.user.qrCode;
//        console.log(elText);
////        qrcode.makeCode(JSON.stringify(elText));
//        qrcode.makeCode(elText);
//        return true;
//     }
//     $scope.gQrcode=function(){
//         return getQrcode();
//     }

 })

 .controller('AddUserStationCtrl', function($scope,$state,$rootScope,userService,stationService) {
 stationService.getStation(function(data){
           $rootScope.addBusLines=data;
      });
$scope.addStation=function(){
    userService.addStation($rootScope.user,function(data){
    userService.getMyStation();
//    $rootScope.station_update=true;
     if($rootScope.doRefreshRider!=null)$rootScope.doRefreshRider();
     if($rootScope.doRefreshStations!=null)$rootScope.doRefreshStations();
//    stationService.getStation(function(data){
//                          $rootScope.busLines=data;
//    });
    $state.go('tab.myinfo');
});
}
  $scope.ToStation = function(){
//            $scope.stations;//            console.log($scope.provinces);//            console.log($scope.cities);
            $scope.m_stations= $scope.addBusLines.busNo.busStationClients;
            }
  $scope.getStation=function(){
        var station=$scope.m_stations.stationId;
        $rootScope.user.stationId=station.stationId;
        $rootScope.user.stationName=station.stationName;
  }




})
