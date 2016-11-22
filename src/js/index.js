/**
 *使用angular.module()创建应用程序模块
 *第一个参数是模块名称
 *第二个是依赖模块数组
 */
var app = angular.module('myApp',[]);

/**
 * 定义控制器myController
 * 第一个参数是控制器的名称
 * 第二个参数是控制器的具体定义，务必添加$scope(作用域对象)
 */
app.controller('myController',function($scope){
  //在作用域中定义变量
  $scope.num = 0;
  //在作用域中定义add函数，以便试图使用
  $scope.add = function(){
    $scope.num++;
  }
  $scope.fn = function(a,b){
    return a+b
  }
})

app.controller('myController2',function($scope){
})
