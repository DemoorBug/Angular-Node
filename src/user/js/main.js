var app = angular.module('myApp',[])


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
app.factory('Auth',function($http){
  var token = '';//令牌变量，如未登录则为空字符串
  return {
    login: function(user){
      return $http.post('http://localhost:3000/users/login',{username:user.name,password:user.password})
    },
    setToken: function(t){
      token = t;
    },
    getToken: function(){
      return token;
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

//定义完成就要注册拦截器
app.config(function($httpProvider){
  $httpProvider.interceptors.push('AuthInterceptor');
})

//主控制器
app.controller('IndexController',function($http,$scope,$rootScope,Auth,User){
  //处理全局事件
  $rootScope.$on('auth:loginRequired',function(){
    console.log('您还没有登录!')
    alert('您还没有登录!')
  });
  $rootScope.$on('auth:loginFailed',function(){
    alert('登录失败!')
  })
  //点击登录按钮
  $scope.login = function() {
    Auth.login($scope.user).success(function(result){
      if(result.status == 'success'){
        alert('登录成功!')
      }
    })
  }
  //点击查看用户列表
  $scope.getUserInfos = function(){
      //调用User服务的相关方法
      User.getUserInfos().success(function(users){
        console.log(users)
      })
  }
})
