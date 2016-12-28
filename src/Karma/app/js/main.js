var app = angular.module('myApp',[]);

app.controller('myController',function($scope,$timeout){
  $scope.time =  {today: new Date()};
  $scope.user = {timezone: 'UTC+8'};
  //计时器,每秒钟执行一次从而更新时间
  var tick = function(){
    $timeout(function() {
      $scope.$apply(function(){
        //强制更新，开始一个新的digest循环
        $scope.time.today = new Date();
      })
      tick();
    },1000)
  }
  tick()
})

//创建一个自定义服务，用来测试http请求预期
app.factory('myService',function($http){

  return {
    getCurrentUser: function(){
      //请求/v1/api/current_user
      return $http.get('/v1/api/current_user')
    }
  }
})


app.value('version','0.0.1')

//创建一个指令：能够提示一条消息，然后在2S后自动消失
app.directive('notification',function($timeout){
  return {
    restrice:'A',
    scope: {
      message:'='
    },
    template:'<div class="notification"><div class="notification-content"><p>{{message}}</p></div></div>',
    replace: true,
    link: function(scope,element,attrs){
      scope.$watch('message',function(newVal,oldVal){
        if(newVal){
          //删除可能存在的隐藏类
          element.removeClass('ng-hide');
          //2秒钟后自动消失
          $timeout(function(){
            scope.$apply(function(){
              scope.message = '3'
            })
            element.addClass('ng-hide')
          },2000);
        }
      })
    }
  }
})

app.controller('NotiController',function($scope){
  $scope.send = function(){
    $scope.message = $scope.txt;
  }
})
