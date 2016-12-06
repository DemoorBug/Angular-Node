var app = angular.module('myApp',[]);

//创建myController,测试$http如何与服务器交互

//注释块的地方可以直接取消注释，将可使用，当然是吧当前使用的先注释掉

app.controller('myController',function($http,$scope){
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
  $http.get('data/user.json').success(function(data){
    $scope.users = data.users;
  })


})
