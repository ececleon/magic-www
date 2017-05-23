angular.module('starter.my', [])
.service('testService', function($http,$rootScope ){
    this.url=function(){
          var my_android_url="http://10.25.156.190:8081/";
          var my_url='http://localhost:8081/';
          var http_url="http://10.25.156.247:8080/bus_tracker/spring/";
          return my_url;
      }
})
