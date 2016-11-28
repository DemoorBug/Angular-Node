var app = angular.module('myApp',[]);

app.controller('myFromController',function($scope){
  $scope.submit= function(){
    console.log('form submit')
  }
})
