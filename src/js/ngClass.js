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
  $scope.myClass= 'red';
  $scope.myArray = ['blue','border'];
  $scope.myObject = {'red':true,'blue':false}
  $scope.src = 'http://livewebbs2.dwstatic.com/huya_1479725090_content.jpg'
})
