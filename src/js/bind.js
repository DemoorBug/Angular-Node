/**
 *使用angular.module()创建应用程序模块
 *第一个参数是模块名称
 *第二个是依赖模块数组
 */
var app = angular.module('myApp',[]);


/**
 * 定义控制器mycontroller
 *
 */

app.controller('myController',function($scope){
  $scope.tr = true;
  $scope.tf = false;
  $scope.fn = function(){
    console.log($scope.tf)
  }
  $scope.nums = function(){
    console.log($scope.num)
  }
})
