/**
 * 自定义指令开始
 */
var app = angular.module('myModule',[]);

//声明第一个指令叫做my-directive
//命名约定：使用驼峰写法，大写字母处在使用的时候需要用'-'隔空
app.controller('myController',function($scope){
  // $scope.myUrl = 'http://www.baidu.com';
  // $scope.myLinkText = '百度';
  $scope.myC = function(){
    console.log('dianji');
  }
})

app.directive('myDirective',function(){
  return {
    restrict:'AECM',
    template: '<a href="{{myUrl}}" ng-click="myClick()" class="col-md-8">{{myLinkText}}</a>',
    replace: true,
    scope: {
      myUrl: '=',
      myLinkText: '@',
      myClick: '&'
    }
  };
})
