var app = angular.module('myApp',[]);
//创建myController,测试$http如何与服务器交互

//注释块的地方可以直接取消注释，将可使用，当然是吧当前使用的先注释掉

//配置请求头，和默认开启缓存
app.config(function($httpProvider){
  //修改默认Content-type为url -encoded方式
  $httpProvider.defaults.headers.post['Content-Type']='application/x-www.form-urlencoded;charset=uft-8'
  //设置默认缓存
  $httpProvider.defaults.cache = true;

  $httpProvider.interceptors.push('myInterceptor');
})

// 声明一个拦截器工厂服务
app.factory('myInterceptor', function(){
  //此处可以设置4个属性：request、response、requestError、responseError
  return {
    request: function(config){
      //可以修改配置对象
      config.headers.customInfs = "qingqiujiexi";
      console.log(config)
      return config;
    },
    response: function(config){
      console.log(config)
      return config;
    },
    requestError: function(rejection){
      console.log(rejection)
      return config;
    },
    responseError: function(rejection){
      console.log(rejection)
      return config;
    }
  }
});



app.controller('myController',function($http,$scope,$cacheFactory){
  //基本使用方式，只接收一个参数，config对象
/*
  $http({
    url:'data/user.json', //设置目标URL，通常不会是一个json文件而是后台的PHP或者jsp文件，通过其查询数据
    method:'get'
  }).success(function(data,status,headers,config){
    //data是返回数据
    $scope.users = data.users
    //status是响应状态代码
    //headers是响应头处理函数
    console.log(headers('etag'))
    //config是完整的配置对象
  }).error(function(data){
    //发生错误，200-299直接就认为出错
  })
  */
  //then方法的使用
/*
  $http({
    url:'data/user.json', //设置目标URL，通常不会是一个json文件而是后台的PHP或者jsp文件，通过其查询数据
    method:'get'
  }).then(function(rsp){
    //rsp是响应对象 so
    $scope.users = rsp.data.users
  },function(rsp){
    //发生错误，200-299直接就认为出错
  })
  */
  //简写形式
/*
  $http.get('data/user.json',{params: {username:'tom',age:20}}).success(function(data){
    $scope.users = data.users;
  })
*/

  $scope.submit = function(){
    //表单提交，构造参数
    $http.post('addUser.php',{data:{username:$scope.username},age:$scope.age});
  }
  /**
   * 实现方式二：自定义缓存对象，通过$cacheFactory服务获取实例
   *
   */
  // var lru= $cacheFactory('lru',{capacity:20});
  /**
   * 按钮响应函数
   * 此处需要将用户列表缓存
   * 实现方式一：设置cache字段为true
   */
  $scope.getUsers = function(){
    $http.get('data/user.json').success(function(data){
      $scope.users = data.users;
    })
  }

})



