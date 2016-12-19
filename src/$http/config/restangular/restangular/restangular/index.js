var app = angular.module('myApp',['restangular']);

app.controller('myController',function($scope,Restangular,$http){
  //使用jsonp访问跨域资源

/*  $http.jsonp('http://localhost:3000/users/jsonp?callback=JSON_CALLBACK')
    .success(function(data){
      console.log(data)
      $scope.users = data.status;
    });*/
    

  // $http的CPRS
  $http.get('http://localhost:3000/users').success(function(users){
    $scope.users = users
  })

  Restangular.setBaseUrl('http://localhost:3000/');

  //获取主Restangular对象
  var User = Restangular.all('users');
  User.getList().then(function(users){
    $scope.users = users;
    console.log(users)
  })

  //获取某个具体用户信息
  $scope.getUser = function(id){
    angular.forEach($scope.users, function(user,index){
      if(user.id == id){
        var editUser = user.clone();  //防止是一个对象，双向数据绑定就会错乱
        $scope.currentUser = editUser;  
        console.log($scope.currentUser.name)
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
      alert(result.message)
    });
  }else{
    $scope.currentUser.put().then(function(result){
      User.getList().then(function(users){
        $scope.users = users;
      })
      alert(result.message);
    })
  }
 }
  $scope.deleteUser = function(id){
    angular.forEach($scope.users, function(user,index){
      if(user.id == id){
        console.log(index)
        user.remove().then(function(result){
          alert(result.message)
          //从本地数组中删除
          if(result.status == 'success'){
            $scope.users.splice(index,1)
          }
        })
        return
      }
    })
  }
})
