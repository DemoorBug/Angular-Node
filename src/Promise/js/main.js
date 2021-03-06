

var app = angular.module('myApp',[]);



app.controller('myController',function($scope,$q){
  $scope.flag = true;
  $scope.handle = function(){
    //1.生成deferred对象
    var deferred = $q.defer();
    //2.得到Promise对象
    var promise = deferred.promise;
    //3.使用then方法监听结果或过程
    promise.then(function(result){
      alert('成功：'+result)
    },function(error){
      //错误reason
      alert('失败：'+ error)
    })
    //4.通过resolve和reject方法和promise交互
    if($scope.flag) {
      //调用resolve方法，则成功函数被执行
      deferred.resolve('你很幸运!');
    }else{
      //调用reject,则失败函数被执行
      deferred.reject('sorr')
    }
  }
})
