var app = angular.module('myApp',[]);

/**
 * 声明常量和变量两种服务
 * 虽然是常量，但是还可以去更改值，
 * config优先级高于controller
 * 常量可以在程序配置函数中使用
 */

app.constant('apiKey','123432141');  //常量
app.value('apiKey2','1232353'); //变量

//创建控制器测试常量和变量的使用
app.controller('MyController',function($scope,apiKey,apiKey2,UserService){
  $scope.apiKey = apiKey;
  $scope.apiKey2 = apiKey2;

  apiKey = '321';
  $scope.apiKey = apiKey;

  UserService.setCurrentUser({name:'what',age:'ins'});

  $scope.ms = UserService.getCurrentUser().name
  console.log($scope.ms)

})

//能否注入到程序配置函数中，是常量和变量之间的区别
app.config(function(apiKey){
  apiKey = '321sd';
  console.log(apiKey)
})

//创建一个service类型的服务
app.service('UserService',function(){
  var currentUser ;
  this.getCurrentUser = function(){
    return currentUser;
  }
  this.setCurrentUser = function(user){
    currentUser = user;
  }
})

//创建一个provider类型的服务
app.provider('MyService',{
  //默认url
  url: 'users.json',
  //添加setUrl方法提供修改url方法
  setUrl: function(newUrl){
    this.url = newUrl;
  },
  $get: function($http){ //可以在此处注入其他服务
    var currentUser = {};
    var self = this
    return {
      getCurrentUser: function(){
        //通过$http请求数据
        // $http.get(self.url).success(function(data){
        //    currentUser = data.users;
        //    return currentUser;
        // })
        return $http.get(self.url);
      },
      setCurrentUser: function(){
        currentUser = user;
      }
    }
  }
})

//可以通过config函数配置provider类型的服务
//MyService+Provider
//
//此处要对MyService进行包装,因此我们config函数中注入$provide
app.config(function($provide,MyServiceProvider){
  MyServiceProvider.setUrl('data/users.json');

  //对MyService包装
  //此处需要在构造函数中注入$delegate 相当于注入服务器的本身，相当于委托人
  //以为需要输出控制台信息，所以注入$log
  $provide.decorator('MyService',function($delegate,$log){
    return {
      getCurrentUser: function() {

        var p = $delegate.getCurrentUser();
        //额外做些事情：
        //1记录下该次请求所消耗的时间
        //首先记录请求发起的时间
        var startAt = new Date();
        p.finally(function(){  //这个东西你是从哪里来的，也不交代下
          $log.info('消耗时间'+(new Date()-startAt)/60+'秒' )
        })

        return p;
      }
    }
  })
})

//此控制器是为了测试provider
app.controller('MyProvider',function($scope,MyService){
  var user = null;
   MyService.getCurrentUser().success(function(data){
    user = data.users;
    $scope.username = user[0].username;
    $scope.age = user[0].age;
   })
})
