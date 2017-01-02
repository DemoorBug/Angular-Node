angular.module('myApp.config',['ngRoute','restangular'])
  .config(function($routeProvider,RestangularProvider){
    //配置路由
    $routeProvider.when('/',{
      templateUrl: 'views/login.html',
      controller: 'LoginController',
    }).when('/users',{
      templateUrl: 'views/users.html',
      controller: 'UsersController'
    }).when('/classes',{
      templateUrl: 'views/classes.html',
      controller: 'ClassesController'
    }).when('/exams',{
      templateUrl: 'views/exams.html',
      controller: 'ExamsController'
    }).otherwise({
      redirectTo: '/'
    });

    //配置restangular
    //设置字段映射，将Restangular默认id字段映射为mongodb中默认的_id字段
    RestangularProvider.setRestangularFields({id:'_id'});
    //配置基础路由
    RestangularProvider.setBaseUrl('http://localhost:3000/');
  });
