//添加controllers模块的名称
angular.module('myApp.controllers',[])
.controller('defaultController',function($scope,$routeParams){
  //获取参数需要注入$routeParams
  //$routeParams 是个对象，封装url查询参数到该对象中
  $scope.pid = $routeParams
})
.controller('myController',function($scope,users,$location){
  //声明一个跳转处理的函数,viewName指要跳转视图的名称
  $scope.jumpTo = function(viewName){
    $location.path(viewName);
  }
  $scope.users = users.data.user;
})
