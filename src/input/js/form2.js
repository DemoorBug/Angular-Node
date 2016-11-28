var app = angular.module('myApp',[]);

app.controller('myFromController',function($scope){
  $scope.email= '100404@qq.com';
  $scope.range= 5;
  $scope.color='#CCCCCC';

  //////
  //  //
  //////
  $scope.redios ='blue';

  $scope.submit = function(){
    console.log($scope.color,$scope.range,$scope.redios)
  }

  $scope.date = new Date()



})
