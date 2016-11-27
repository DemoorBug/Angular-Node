var app = angular.module('myApp',['ngRoute'])


//配置路由(config并不限制于路由配置)
app.config(function($routeProvider){
  //定义路由:when 方法定义一个路由，当路径为'/'，打开指定视图
  $routeProvider.when('/',{
    templateUrl: 'tpl/welcome.html'
  }).when('/main',{
    templateUrl: 'tpl/main.html',
    controller: 'myController'
  }).when('/default/:pid',{//此处定义了一个pid参数
    templateUrl: 'tpl/default.html',
    controller: 'defaultController'
  }).otherwise({
    redirectTo: '/' //如果匹配不到任何合法URL则重定向到/页面
  })
})

//定义一个控制器，处理页面跳转
app.controller('myController',function($scope,$location){
  //声明一个跳转处理的函数,viewName指要跳转视图的名称
  $scope.jumpTo = function(viewName){
    $location.path(viewName);
  }
}).controller('defaultController',function($scope,$routeParams){
  //获取参数需要注入$routeParams
  //$routeParams 是个对象，封装url查询参数到该对象中
  $scope.pid = $routeParams
})
