var app = angular.module('MyApp',[]);

app.controller('requiredController',function($scope){
  //创建一个属性focused,用于在失去焦点时显示错误
  //$scope.focused = false;

  //创建一个模型
  $scope.submitted = false;

  $scope.submits = function(){
    if($scope.myForm.$valid) {
      $scope.submitted = false;
    }else {
      $scope.submitted = true;
    }
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

//创建自定义指令，完成用户名唯一性的效验
app.directive('ensureUnique',function(){
  return {
    require: 'ngModel',
    link: function(scope,element,attrs,ctrl) {
      console.log(attrs.ngModel)
      //通过检测属性ngModel的名称的变化，动态查询是否存在相应的用户名
      scope.$watch(attrs.ngModel,function(newVal,oldVal){
        //判断是否存在，存在就通过
        if(['Tom','Jerry'].indexOf(newVal)!=-1){
          //使用ngModel的控制器他的一个方法$setValidity设置验证属性
          ctrl.$setValidity('unique',false);
        }else {
          ctrl.$setValidity('unique',true);
        }
      })
    }
  }
})
