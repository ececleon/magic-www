angular.module('station.controllers', [])

.controller('StationsCtrl', function($rootScope,$scope,$http,stationService) {

    $rootScope.doRefreshStations=function(){
         stationService.getStation(function(data){
                $rootScope.stationLines=data;
//                for(var i in data){
//                    var stations=data[i].busStationClients;
//                    for(var j in stations){
//                        var station =stations[j];
//                        var users=station.userList.userClients;
//                        var onLineUser=0;
//                        for(var k in users){
//                            var user=users[k];
//                            console.log(user);
//                            var onTime=user.onTime;
//                            user.boardTiem=onTime;
//                            if(onTime!=null)onLineUser++;
//                        }
//                        station.onLineUser=onLineUser;
//                        station.totalUsers=station.userList.totalUsers;
//                    }
//                }
                $scope.$broadcast('scroll.refreshComplete')
         });
    }
//    $scope.initStationLines=function(){
//        if($rootScope.station_update){
//            $rootScope.station_update=false;
//            stationService.getStation(function(data){
//                console.log(data[0].busStationClients[0].userList.userClients[0]);
//                var u=data[0].busStationClients[0].userList.userClients[0];
//                for(var i=0;i<10000;i++){
//                    var length=data[0].busStationClients[0].userList.userClients.length;
//                    u.diji=length;
//                    data[0].busStationClients[0].userList.userClients[length]=u;
//                }
//                $rootScope.stationLines=data;
//            });
//        }
//
//    }

     $scope.getStations=function(stationLine){
//          for(var i in $rootScope.stationLines){
//              var line=$rootScope.stationLines[i];
//              if(line.busNo==stationLine.busNo)continue;
//              line.show=false;
//          }
          if(stationLine.show)stationLine.show=false;
          else stationLine.show=true;
     }
})

.controller('StationUserCtrl', function($scope, $stateParams, $http,stationService, $rootScope ) {
//    var url=myService.url()+"buses/findbusstation";
//    var id=parseInt($stateParams.stationId);
//    console.log($stateParams.station);
    var station=JSON.parse($stateParams.station);
    console.log(station);
    $scope.station=station;
//    stationService.getStationUser(id,function(data){
//        $scope.users=data;
//    });
 })

.controller('RiderCtrl', function($scope,$rootScope,$http,stationService) {
    $rootScope.doRefreshRider=function(){

         stationService.getAllUsers(function(data){
                $scope.users =data;
                $scope.$broadcast('scroll.refreshComplete')
         });
    }

 })

