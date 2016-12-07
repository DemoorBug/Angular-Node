var app = angular.module('myApp',['ngResource']);

//创建控制器获取用户Tom的数据并显示
//此处需要注入$resource,通过RESTful的形式获取数据
app.controller('myController',function($scope,$resource){
  //获取资源实例
  var User = $resource('data/:name.json',{name:'@name'});
  //通过资源获取数据
  //资源中有两个基于GET的HTTP方法：分别叫做get,query
/*
  User.get({name:'user'},function(result){
    $scope.user = result.users
  },function(error){
    console.log(error)
  })
*/
  //可以直接使用返回结果，好像是一个同步调用

  $scope.user = User.get({name:'user'});
  console.log($scope.user)

  //query方法的使用，它和get方法基本一致，唯一一点不同是AngularJs返回结果会被转换为数组
  User.query({name:'tom'},function(result){  //返回的必须是数组，对象就会报错
    console.log(result)
  })
})
