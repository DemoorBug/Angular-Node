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
  $scope.$watch('danj*shul+danj2*shul2',function(newVal,oldVal){
    $scope.totl = $scope.danj*$scope.shul+$scope.danj2*$scope.shul2
  })

  $scope.b = new Date();
})
