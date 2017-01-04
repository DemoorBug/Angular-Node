var app = angular.module('myApp',['myApp.config','myApp.controllers','myApp.services','myApp.filters']);


//程序初始化
app.run(function($rootScope,$location,UserService){
  var nexts;
  //监听$routeChangeStart事件并处理之
  $rootScope.$on('$routeChangeStart',function(evt,next,curr){
    console.log('s')
    nexts = next;
    //想要跳转至除了登录页面以外的其他页面都需要用户处理已登录状态
    if(next.$$route && next.$$route.originalPath != '/' && !UserService.isLog()){
      //使用户重定向到登录页面
      $location.path('/');
    }
  })

})
