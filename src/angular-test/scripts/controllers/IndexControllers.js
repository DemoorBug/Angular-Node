//主页相关逻辑控制器
angular.module('myApp.controllers',['myApp.services'])
  .controller('MyController',['$scope',function($scope){
    $scope.message = 'Hello World';
  }])
  .controller('MainController',['$scope','$location',function($scope,$location){
    $scope.goUsersPage = function(){
      $location.path('/');
    }
  }])
  .controller('UsersController',['$scope','userService',function($scope,userService){
    $scope.users = userService.getUsers()
  }])
