var app = angular.module('myApp',[]);

app.controller('myFromController',function($scope){
  $scope.email= '100404@qq.com';
  $scope.range= 5;
  $scope.color='#CCCCCC';

  //////
  //  //
  //////
  $scope.radios ='blue';

  $scope.submit = function(){
    console.log($scope.color,$scope.range,$scope.redios)
  }
  $scope.submit1 = function(){
    console.log($scope.value1)
  }
  $scope.date = new Date()




})
