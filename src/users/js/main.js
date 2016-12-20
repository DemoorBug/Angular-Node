var app = angular.module('myApp',[])


//定义http请求拦截器
app.factory('AuthInterceptor',function($q,$rootScope,$injector){
  return {
    'request':function(req){
      //发送给服务器的请求添加令牌token;
      var Auth = $injector.get('Auth');
      //把token放入请求头
      req.header['token'] = Auth.getToken();
    },
    'response':function(res){
      //如果用户请求的是登录接口则判断是否成功并保存返回的token
      if(res.config.url == 'http://localhost:3000/users/login') {
        if(res.deta.status == 'success'){
          var Auth = $injector.get('Auth'); //避免循环引用错误，使用$injector注入服务
          //假设返回格式：{token: 'AUTH_TOKEN'};
          Auth.setToken(res.data.token);
        }else {
          //如果登录失败广播一条事件在控制器中处理
          $rootScope.$broadcast('auth:loginFailed1')
        }
      }
      return res;
    },
    'responseError': function(rejection){
      //错误处理
      switch(rejection.status){
        case 401://未登录
            if(rejection.config.url != 'http://localhost:3000/users/login'){
              //如果不在登录页面
              $rootScope.$brodcast('auth:loginRequird');
            }
            break;
        case 403: //被服务器拒绝，意为权限不足
          $rootScope.$broadcast('auto:forbidden');
          break;
        case 404: //未找到接口或页面
            $rootScope.$broadcast('auto:notFound');
            break;
        case 500: //服务器错误
            $rootScope.$broadcast('auth:error');
            break;

      }
    }

  }
})
