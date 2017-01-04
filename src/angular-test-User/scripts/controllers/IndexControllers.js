//主页相关逻辑控制器
angular.module('myApp.controllers',['myApp.services'])
  .controller('LoginController',['$scope','$location','UserService',function($scope,$location,UserService){
        $scope.login = function(){
          UserService.login($scope.user).then(function(result){
          if(result.status == 'success') {
            //登陆成功
            //1.设置用户
            UserService.setUser(result.user);
            //2.根据用户角色跳转：如果是管理员或教师跳转至用户管理模块
            //如果是学生跳转至考试模块
            if(result.user.role == 3) {
              $location.path('/exams');
            }else {
              $location.path('/users');
            }

        }
      })
    }
  }])
  .controller('UsersController',['$scope','UserService',function($scope,UserService){
    //激活users导航按钮
    $scope.isUsersActive= true;
    $scope.isClassesActive= false;
    $scope.isExamsActive= false;
    //查询用户列表
    //管理员默认查询所有教师账号，教师默认查询属于其所在班级的所有学生
    UserService.getUserList().then(function(users){
      $scope.users = users;
    })

    //删除用户
    $scope.remove = function(user){
      //DELETE http://localhost:3000/users/abcdefdfadlfkajdf
      user.remove().then(function(result){
        if(result.status == 'success'){
          //删除成功,从数组中移除
          angular.forEach($scope.users,function(u,i){
            if(u._id == user._id){
              $scope.users.splice(i,1);
            }
          })
        }
      })
    }

    //添加用户
    $scope.addUser = function(){
      $scope.addeUser = {};

    }
    $scope.submit= function() {
      UserService.addUser($scope.addeUser).then(function(result){
        if(result.status == 'success'){
          UserService.getUserList().then(function(users){
            $scope.users = users;
          })
        }
      })
    }
  }])
  .controller('ClassesController',['$scope',function($scope){
  }])
  .controller('ExamsController',['$scope',function($scope){
  }])
