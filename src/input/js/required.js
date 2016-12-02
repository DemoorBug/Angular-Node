var app = angular.module('MyApp',[]);

app.controller('requiredController',function($scope){
  //创建一个属性focused,用于在失去焦点时显示错误
  //$scope.focused = false;


  $scope.submit = function(){

  }
})

//创建自定义指令，完成失去焦点验证触发行为
app.directive('myFocus',function(){
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope,element,attrs,ctrl) {
      element.on('focus',function(){
        scope.$apply(function(){
          ctrl.$focused = true;
        })
      });
      element.on('blur',function(){
        scope.$apply(function(){
          ctrl.$focused = false;
        })
      });
    }
  }
})
