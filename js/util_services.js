angular.module('bus.util', [])
.service('util', function($http,$rootScope,$ionicPopup){

          var my_android_url="http://10.25.156.190:8081/";
          var my_url='http://127.0.0.1:8081/';
          var http_url="http://192.168.191.1:8080/bus_tracker/spring/";
          this.url=http_url;
//    this.url=function(){
//          var my_android_url="http://10.25.156.190:8081/";
//          var my_url='http://127.0.0.1:8081/';
//          var http_url="http://10.25.156.151:8080/bus_tracker/spring/";
//          return my_url;
//    }
    this.saveJson=function(filename,da){
    console.log(da);
        data={
            title:filename,
            data:da
        }
        $http({
                  url:this.url+"save/json",
                  method:'POST',
                  params:data
                  }).success(function (data) {
//                      res(data);
        });
    }

    this.showLog=function(context){
        var confirmPopup = $ionicPopup.alert({
            title: '<strong>Log输出</strong>',
            template: context
        });
        console.log(context);
    }

})
.factory('locals',['$window',function($window){
        return{
            //存储单个属性
            set :function(key,value){
                $window.localStorage[key]=value;
            },
            //读取单个属性
            get:function(key,defaultValue){
                return  $window.localStorage[key] || defaultValue;
            },

            //存储对象，以JSON格式存储
            setObject:function(key,value){
                $window.localStorage[key]=JSON.stringify(value);
            },
            //读取对象
            getObject: function (key) {
                return JSON.parse($window.localStorage[key] || '{}');
            },
            //删除对象
            deleteObject: function(key){
                $window.localStorage[key]='{}';
            }

        }
  }])
