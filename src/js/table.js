/**
 *使用angular.module()创建应用程序模块
 *第一个参数是模块名称
 *第二个是依赖模块数组
 */
var app = angular.module('myApp',[]);


/**
 * 定义控制器mycontroller
 *
 */

app.controller('myController',function($scope,$filter){
  $scope.$watch('danj*shul+danj2*shul2',function(newVal,oldVal){
    $scope.totl = $scope.danj*$scope.shul+$scope.danj2*$scope.shul2
  })

  $scope.b = new Date();

  $scope.friends = [
    {name:'john',phone:555+'-'+1234},
    {name:'jack',phone:234+'-'+1234},
    {name:'jm',phone:987+'-'+1234},
    {name:'timou',phone:119+'-'+1234},
    {name:'mods',phone:098+'-'+1234}
  ]

  $scope.reverse = true;

  $scope.order = function(field,reverse){
    $scope.friends = $filter('orderBy')($scope.friends,field,reverse)
  }
})
  //自定义一个大写过滤器：可以将输入字符串的第一个字母变成大写
  //{{'name'|capitalize:prom1:prom2}}  对应function(input,prom1,prom2)厉害了
app.filter('capitalize',function(){
  return function(input){
    //input就是要过滤的字符串
    if(input==undefined) input='0';
    else if(input=="") input='1'
    return input[0].toUpperCase()+input.substr(1);
  }
})
