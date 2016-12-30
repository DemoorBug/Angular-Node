var app = angular.module('myApp',[]);

app.factory('greeter',function(){
  return {
    greet: function(msg){
      alert(msg);
    }
  }
});

app.controller('myController',['$scope','greeter',function($scope,greeter){
  $scope.sayHello = function(){
    greeter.greet('hello')
  }
}])


//使用显示注入
/*
var aController = function(a,b) {
  console.log('loaded controller ',b);

  //控制器逻辑...

}
//设置函数的$inject属性
aController.$inject = ['$scope','greeter'];

//声明工厂函数
var greeter = function(){
  return {
    greet: function(msg){
      alert(msg)
    }
  }
}

//应用控制器和工厂服务

angular.module('myApp',[])
  .controller('myController',aController)
  .factory('greeter',greeter);
*/
