var app= angular.module('myApp',[]);

/**
 * 声明一个工厂服务
 * $http 是和后台通信的 厉害了
 * 工厂会返回一个对象。很像封装
 */
app.factory('UserService',function($http){
  var currentUser = {}; //保持当前用户数据
  return {
    getCurrentUser: function(){
      return currentUser;
    },
    setCurrentUser: function(user){
      currentUser = user;
    }

  }
})
//声明两个控制器，他们通过userService服务通信

app.controller('myFormController',function($scope,$rootScope,UserService){
  $scope.submit = function(){
    UserService.setCurrentUser({username:$scope.username,age:$scope.age})
    $rootScope.$broadcast('currentUserChange');
  }
})

app.controller('Mycontroller',function($scope,$rootScope,UserService){
  // 监听currentUserChange消息，则做出响应
  $scope.$on('currentUserChange',function(){
    $scope.username = UserService.getCurrentUser().username;
    $scope.age = UserService.getCurrentUser().age;
  })
})
