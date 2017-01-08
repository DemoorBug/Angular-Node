angular.module('myApp',['ngAnimate'])
  .directive('win',function($animate){//定义win指令，他是一个可伸缩的窗口
    return {
      replace: true,
      template: '<div class="win showDetails"><h2 class="page-header">title</h2><div class="win-body">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio minima repudiandae eveniet quod vitae. Aperiam modi eligendi laborum, in amet tempore optio facilis, alias commodi eaque, provident rerum praesentium iste!</div></div>',
      link: function(scope,element,attrs){
        //保存窗口打开状态
        scope.showDetails = true;//默认是展示的

        //给page-header元素添加点击事件监听
        element.find('.page-header').on('click',function(){
          //根据viewDateils变量决定是打开还是收起
          if(scope.showDetails == true) {
            //为true则为打开状态，则这次点击需要收起，移除showDetails
            $animate.removeClass(element,'showDetails');
          }else {
            //为false说明是收起状态，则点击时打开窗口，并添加showDetails类
            console.log('s')
            $animate.addClass(element,'showDetails')
          }
          //变更标识符
          scope.showDetails = !scope.showDetails;

          //更新  强制更新开始一次新的angular循环
          scope.$apply();
        })
      }
    }
  })
  .controller('myController',function(){

  })
  .animation('.showDetails',function(){
    return {
      addClass: function(elem,className,done){
        //定义打开动画
        if(className == 'showDetails'){
          var winBody = elem.find('.win-body');
          var h = winBody.data('height');
          winBody.animate({height:h},1000,done)
        }
      },
      removeClass: function(elem,className,done){
        //定义关闭动画
        if(className == 'showDetails'){
          var winBody = elem.find('.win-body');
          winBody.data('height',winBody.height());
          winBody.animate({height:0},1000,done)
        }
      }
    }
  })
