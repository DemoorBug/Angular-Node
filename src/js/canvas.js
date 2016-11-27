/**
 * canvas演示
 */
 var app = angular.module('myCanvas',[]);

 app.controller('myController',function($scope){
  $scope.config={x:0,y:0,w:100,h:100}
 })
//自定义指令my-canvas可以根据传值绘制一个矩形
 app.directive('myCanvasDs',function(){
  return {
    restrict: 'E',
    template: '<canvas></canvas>',
    scope: {//通过创建隔离作用域，指令可以减少对外部的依赖
      config: '=s'
    },
    require: 'ngModel',//注入ngModel,可以使用其控制器中的特殊方法动态更新视图
    link: function(scope,element,attrs,ctrl){//当注入ngModel以后，第四个参数为其控制器

      //链接函数中处理DOM操作
      var cvs = element[0];//获取画布对象
      var ctx = cvs.getContext('2d');//获取上下文
      var con = scope.config;
      scope.draw = function(){
        ctx.clearRect(0,0,cvs.width,cvs.height)
        ctx.fillRect(con.x,con.y,con.w,con.h)
      }
      scope.draw()

      element.on("mousemove",function(e){
        con.x = e.offsetX;
        con.y = e.offsetY;
        scope.draw();
        //这里调用ngModel控制器的$setViewValue(),可以动态更新视图的相关模型
        ctrl.$setViewValue(scope.config)
      })
      //通过$watch观测config变化，动态重绘
      scope.$watch('config.x+config.y',function(){
        scope.draw()
      })
    },
    replace: true
  }
 })
