angular.module('user.services', [])

.service('userService', function($http,$rootScope,util,stationService,$log){

  this.login = function(data,res){
//    var da={
//             'bankId':1,
//             'password':1
//             };
//     var config = {
//                   headers: {
//                       'Content-Type': "application/x-www-form-urlencoded"
//                   }
//               };
          $http({
          url:util.url+"users/login",
          method:'POST',
          params:data
          }).success(function (data) {
              console.log(data);
              res(data);
          });
  }

  this.register=function(data,res){
      $http({
                url:util.url+"users/register",
                method:'POST',
                params:data
      }).success(function (data) {
              res(data);
          });
    }

//    this.getBusLine=function(res){
//      $http({
//                url:util.url()+"buses/getallroutes",
//                method:'GET'
//      }).success(function (data) {
//              res(data);
//          });
//    }
    this.addStation=function(data,res){
    console.log(data);
      $http({
                url:util.url+"users/updateuser",
                method:'POST',
                params:data
      }).success(function (data) {
              res(data);
        }).error(function(){
              console.log('失败！');
        });
    }
    this.getMyStation=function(){
      if($rootScope.user.stationId==null)$rootScope.flag=false;
          else {
            $rootScope.flag=true;
            stationService.findbusstation($rootScope.user.stationId,function(data){
                $rootScope.myStation=data;
            });
      }
    }
})

.factory("userService111", function($http,$rootScope,util,stationService,$log) {
    var user;
    return{
        login:function(data){
            console.log(data);
            var ss=function(data){
                user=data;
                console.log(22);
                console.log(user);
                return data;
            }
            $http({
                  url:util.url+"users/login",
                  method:'GET',
                  params:data
                 }).success(function (data) {
                     console.log(data);
                     return ss(data);
//                     return data;
            });
//            console.log(111);
//            console.log(user);
//            return user;
        }
    }
})
