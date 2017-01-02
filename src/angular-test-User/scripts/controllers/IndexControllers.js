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
  .controller('UsersController',['$scope',function($scope){
  }])
  .controller('ClassesController',['$scope',function($scope){
  }])
  .controller('ExamsController',['$scope',function($scope){
  }])
