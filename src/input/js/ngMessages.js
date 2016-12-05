var app = angular.module('myApp',['ngMessages']);

app.controller('aMessages',function($scope){
  $scope.submitted = false;
  $scope.submit = function(){
   if ($scope.myForm.$valid) {
    $scope.submitted = false;
   }else {
    $scope.submitted = true;
   }
  }
})


app.directive('ensureUnique',function(){
  return {
    require: 'ngModel',
    link: function(scope,element,attrs,ctrl){
      console.log(attrs.ngModel)
      scope.$watch(attrs.ngModel,function(newVal,oldVal){
        if (['attrs','Tom'].indexOf(newVal) != -1) {
          ctrl.$setValidity('unique',false);
        }else {
          ctrl.$setValidity('unique',true);
        }
      })
    }
  }
})
