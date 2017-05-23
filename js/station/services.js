angular.module('station.services', [])

.service('stationService', function($http,$rootScope,util){

  this.getStation=function(res){
      var url=util.url+"buses/getallroutes";
            $http({
                url:url,
                method:'GET'
            }).success(function(data){
                res(data);
       })
  }

  this.getStationUser=function(id,res){
//      var url=util.url()+"buses/findbusstation";
//            $http({
//                url:url,
//                method:'GET',
//                params:{
//                  'stationId':id
//                }
//            }).success(function(data){
//                console.log(data);
//                res(data.userList.userClients);
//       })
        var isBreak=false;
        var lines=$rootScope.stationLines;
        for(var i in lines){
            var sLine=lines[i];
            for(var i in sLine.busStationClients){
                        var station =sLine.busStationClients[i];
                        if(station.stationId==id){
                            $rootScope.station=station;
                            res(station.userList.userClients);
                            isBreak=true;
                            break;
                        }
            }
            if(isBreak)break;
        }

  }

  this.getAllUsers=function(res){
      var url=util.url+"users/getallusers";
            $http({
                url:url,
                method:'GET'
            }).success(function(data){
                console.log(data);
                res(data);
       });
  }
  this.findbusstation=function(id,res){
      var url=util.url+"buses/findbusstation";
            $http({
                url:url,
                method:'GET',
                params:{
                  'stationId':id
                }
            }).success(function(data){
                res(data);
       })
  }

})

//.factory("userService", function($http) {
//
//});
