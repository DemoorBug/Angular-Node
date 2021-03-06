var app = angular.module('myApp',['restangular'];

app.controller('myController',function($scope,Restangular){
  //获取主Restangular对象
  var User = Restangular.all('users');
  User.getList().then(function(users){
    $scope.users = users;
  })

  //获取某个具体用户信息
  $scope.getUser = function(id){
    angular.forEach($scope.users, function(user,index){
      if(user.id == id){
        $scope.currentUser = user;
        return
      }
    })
    $scope.operation = '修改';
  }
/*
  //如果要单独查询，可以像下面这样写：
  Restangular.one('users',id).get().then(function(user){
    $scope.currentUser = user;
  })
  */
 //点击添加用户按钮
 $scope.addUser = function(){
  $scope.currentUser = {};
  $scope.operation = '添加';

 }
 //保存用户信息到服务器
 $scope.saveUser = function(){
  if($scope.operation == '添加') {
    User.post($scope.currentUser).then(function(result){
      alert(result.massage)
    });
  }else{
    $scope.currentUser.put().then(function(result){
      alert(result.message);
    })
  }

  $scope.deleteUser = function(id){
    angular.forEach($scope.users, function(user,index){
      if(user.id == id){
        user.remove().then(function(result){
          alert(result.massage)
          //从本地数组中删除
          if(result.status == 'success'){
            $scope.user.splice(index,1)
          }
        })
        return
      }
    })
  }
 }
})
