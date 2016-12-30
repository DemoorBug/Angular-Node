angular.module('myApp.config',['ngRoute'])
  .config(function($routeProvider){
    //配置路由
    $routeProvider.when('/',{
      templateUrl: 'views/main.html',
      controller: 'UsersController'
    }).when('/users',{
      templateUrl: 'views/users.html',
      controller: 'MainController'
    }).otherwise({
      redirectTo: '/'
    })
  });
