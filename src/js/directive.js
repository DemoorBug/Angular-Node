/**
 * 自定义指令开始
 */
var app = angular.module('myModule',[]);

//声明第一个指令叫做my-directive
//命名约定：使用驼峰写法，大写字母处在使用的时候需要用'-'隔空
app.controller('myController',function($scope){
  // $scope.myUrl = 'http://www.baidu.com';
  // $scope.myLinkText = '百度';
  $scope.i = 0;
  $scope.myC = function(){
    console.log('dianji');
  }
  $scope.content = 'Hello directive'
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
//Template
app.directive('myTemplate',function(){
  return {
    restrict:'A',
    template:function(tElement,tAttrs){
      console.log(tElement,tAttrs);
      return '<div>Hello Word</div>'
    }
  }
})
//templateUrl
app.directive('myTemplateUrl',function(){
  return {
    restrict:'A',
    templateUrl: './directive/directive.html',
    replace: true
  }
})
/**
 * [description]
 * @param  {[type]} ){               return {    restrict:'A',    templateUrl: './directive/directive.html',    replace: true  }} [description]
 * @return {[type]}     [description]
 */
app.directive('myScope',function(){
  return {
    restrict:'A',
    template: '<div>{{comBar}}</div>',
    scope:{},
  }
})


/**
 * 使用嵌入transclude属性
 * 生成一个侧边栏
 */
app.directive('myTranscludeLn',function(){
  return {
    restrict:'AE',
    scope: {
      title: '@'
    },
    transclude: true,
    templateUrl:'./directive/directive2.html'

  }
})

/**
 * 指令中使用controller
 * 当控制器用于指令时，有更多可以注入的特别参数
 * $scope 作用域
 * $element 当前指令作用的标签元素,jqLite对象 轻量级JQ
 * $attrs 又元素上所有输入组成的对象
 * $transclude 嵌入链接函数，克隆元素和操作DOM，对作用域进行绑定
 */
app.controller('myConDccontroller',function($scope,$element,$attrs,$transclude){
  console.log($scope,$element,$attrs,$transclude)
})
app.directive('myConDc',function(){
  return {
    restrict: 'EA',
    template: '<div>Hello Word<div>',
    // controller: 'myConDccontroller'
    controller:function($scope,$element,$attrs,$transclude){//匿名控制器
      //console.log($scope,$element,$attrs,$transclude)
    }
  }
})

/**
 * 使用require属性可以导入其他指令的控制器使用
 */
app.directive('myConDc2',function(){
  return {
    restrict: 'EA',
    // require: 'myConDc2',//字符串指明其他指令名称
    //require: ['myConDc2','myConDc3']//数组指明多个其他指令名称
    //放在链接函数中的第四个参数使用
    //不仅可以注入自定义的指令名称，还能指定内置的指令名称
    // requrie:'ngModel' //该命令可以注入ngModel的控制器以备使用
  }
})
/**
 * 使用controllerAs
 */
app.directive('myConAsDc',function(){
  return {
    restrict: 'A',
    template: '<h4>{{myController.msg}}</h4>',
    controllerAs:'myController',
    controller: function (){
      this.msg= 'hello,wold!';//使用别名甚至可以不用注入$scope,都可以定义模型

    }
  }
})

/**
 * 带编译函数的指令,此情况实际开发中不多见
 */
app.directive('myDcWithCompile',function factory(){
  var directiveDefinitionObject = {
    compile: function compile(tElement,tAttrs,transclude){
      //在返回模板函数钱，可以修改tElement
      //....
      return function(scope,element,attrs){
        //element就是修改完后的
      }
    }
  }
  return directiveDefinitionObject;
})
/**
 * 返回对象写法
{
  pre:function(scope,element,attrs){},
  post:function(){}
}
 */
