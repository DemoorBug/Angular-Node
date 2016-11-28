//添加ngROute模块依赖
var app = angular.module('myApp',['ngRoute','myApp.controllers'])


//配置路由(config并不限制于路由配置)
app.config(function($routeProvider){
  //定义路由:when 方法定义一个路由，当路径为'/'，打开指定视图
  $routeProvider.when('/',{
    templateUrl: 'tpl/welcome.html',
    // controller: 'usersController'
  }).when('/main',{
    templateUrl: 'tpl/main.html',
    controller: 'myController',
    resolve: {
      users: function($http){ //控制器中使用时变量名称
        //在此处定义了$http请求获取用户列表数据
        //最终返回的应是$http返回的是promis对象
        return $http.get('data/user.json')
      }
    }
  }).when('/default/:pid',{//此处定义了一个pid参数
    templateUrl: 'tpl/default.html',
    controller: 'defaultController',
  }).otherwise({
    redirectTo: '/' //如果匹配不到任何合法URL则重定向到/页面
  })
})

//定义一个控制器，处理页面跳转

