var app = angular.module('myApp',['ngRoute','ngCookies'])

//定义常量
app.constant('ACCESS_LEVEL',{pub:1,user:2})

//配置路由

//定义完成就要注册拦截器
/*app.config(function($httpProvider){
  $httpProvider.interceptors.push('AuthInterceptor');
})*/


app.config(function($httpProvider,$routeProvider,ACCESS_LEVEL){
  $httpProvider.interceptors.push('AuthInterceptor');
  //定义路由
  $routeProvider.when('/',{
    templateUrl: 'view/main.html',
    controller: 'MainController',
    access_level: ACCESS_LEVEL.pub
  }).when('/account',{
    templateUrl: 'view/Account.html',
    controller: 'AccountController',
    access_level: ACCESS_LEVEL.user //用户只有登陆才能访问user权限
  }).otherwise({
    redirectTo:'/'
  })
})


//定义控制器
app.controller('MainController',function($scope,$location,Auth){
  //点击进入用户中心按钮
  $scope.enterUserCenter = function(){
    $location.path('/account');//跳转到用户中心
  }
  //点击登录按钮
  $scope.login = function() {
    Auth.login($scope.user).success(function(result){
      if(result.status == 'success'){
        alert('登录成功!')

        $scope.user.role = result.role;
        Auth.setUser($scope.user)
      }
    })
  }
})
app.controller('AccountController',function($scope,Auth){
  //设置当前用户
  console.log(Auth.getUser())
  $scope.currentUser = Auth.getUser();
})


//run方法触发全局事件的处理和监听行为 
app.run(function($rootScope,Auth,$location){
  $rootScope.$on('auth:loginRequired',function(){
    alert('您还没有登陆！')
  });
  $rootScope.$on('auth:loginFailed',function(){
    alert('登陆失败')
  });

  //监听$routeChangeStart事件并处理
  $rootScope.$on('$routeChangeStart',function(evt,next,curr){
    //next为将要跳转视图对象,curr是当前视图对象
    if(curr && !Auth.isAuthorized(next.$$route.access_level)){
      if(Auth.isLoggedIn()){
        alert('您没有访问权限！');
      }else {
        alert('您没有登陆!');
      }
      $location.path('/');//假如用户不能查看用户中心，则跳转到主页
    }
  })
})

//定义http请求拦截器
app.factory('AuthInterceptor',function($q,$rootScope,$injector){
  return {
    request : function(req){
      //发送给服务器的请求添加令牌token;
      var Auth = $injector.get('Auth');
      //把token放入请求头
      req.headers['token'] = Auth.getToken();
      console.log(req.headers)
      return req;
    },
    response : function(res){
      //如果用户请求的是登录接口则判断是否成功并保存返回的token
      if(res.config.url == 'http://localhost:3000/users/login') {
        if(res.data.status == 'success'){
          var Auth = $injector.get('Auth'); //避免循环引用错误，使用$injector注入服务
          //假设返回格式：{token: 'AUTH_TOKEN'};
          Auth.setToken(res.data.token);
        }else {
          //如果登录失败广播一条事件在控制器中处理
          $rootScope.$broadcast('auth:loginFailed')
        }
      }
      return res;
    },
    responseError : function(rejection){
      console.log(rejection)
      //错误处理
      switch(rejection.status){
        case 401://未登录
          if(rejection.config.url != 'http://localhost:3000/users/login'){
            //如果不在登录页面
            $rootScope.$broadcast('auth:loginRequired');
          }
          break;
        case 403: //被服务器拒绝，意为权限不足
          $rootScope.$broadcast('auth:forbidden');
          break;
        case 404: //未找到接口或页面
          $rootScope.$broadcast('auth:notFound');
          break;
        case 500: //服务器错误
          $rootScope.$broadcast('auth:error');
          break;

      }
      return rejection;
    }
  }
})
//用户的认证服务，上面有用到
app.factory('Auth',function($http,$cookieStore,ACCESS_LEVEL){
  var token = '';//令牌变量，如未登录则为空字符串
  var user = $cookieStore.get('user');//保存当前登录用户
  return {
    login: function(user){
      return $http.post('http://localhost:3000/users/login',{username:user.name,password:user.password})
    },
    setToken: function(t){
      token = t;
    },
    getToken: function(){
      return token;
    },
    getUser: function(){
      return user
    },
    setUser: function(u){
      //设置默认用户角色
      if(!u.role || u.role< 0){
        u.role = ACCESS_LEVEL.pub
      }
      user = u;
      $cookieStore.put('user',user)
    },
    isLoggedIn: function(){
      //判断用户是否登陆
      return user ? true : false
    },
    isAuthorized: function(lvl){//判断用户权限是否足以查看某页面
      return (user && user.role) ? user.role >= lvl : false;
    }

  }
})

//定义用户服务，处理用户相关操作的接口
app.factory('User',function($http){
  return {
    getUserInfos: function(){
      return $http.get('http://localhost:3000/users')
    }
  }
})

