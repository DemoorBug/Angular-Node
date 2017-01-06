var app = angular.module('myApp',['ngAnimate','ngRoute']);

app.config(function($routeProvider){
  $routeProvider.when('/1',{
    template: '<div class="page page1">Page 1</div>'
  }).when('/2',{
    template: '<div class="page page2">Page 2</div>'
  }).otherwise({
    redirectTo: '/1'
  })
})

app.animation('.fade-in',function(){//定义fade类相关动画
  return {
    enter: function(element,done){
      //调用JQuery的动画函数animate
      element.css({opacity:0}).animate({opacity:1},1000,done)
    },
    leave: function(element,done){
      element.css({opacity:1}).animate({opacity:0},1000,done)
    },
    addClass: function(element,className,done){
      if(className == 'ng-hide'){
        element.css({opacity:1}).animate({opacity:0},1000,done)
      }else {
        done()
      }
    },
    removeClass: function(element,className,done){
      if(className == 'ng-hide'){
        element.css({opacity:0}).animate({opacity:1},1000,done)
      }else {
        done()
      }
    },
  }
})

app.animation('.slide',function(){
  return {
    enter: function(element,done){
      element.css({top:'100%'}).animate({top:'0%'},1000,done);
    },
    leave: function(element,done){
      element.css({top:'0%'}).animate({top:'-100%'},1000,done);
    }
  }
})

app.animation('.animate-repeat',function(){//定义animate-repeat类相关动画
  return {
    enter: function(element,done){
      element.animate({opacity:1,'max-height':'40px'},1000,done)
    },
    leave: function(element,done){
      element.animate({opacity:0,'max-height':'0'},1000,done)
    },
    move: function(element,done){//如果列表项相邻想被过滤则其发生移动，或者重新排序列表
      element.animate({opacity:1,'max-height':'40px'},1000,done)
    }
  }
})


app.controller('myController',function($scope,$location){
  $scope.switchPage = function(num){
    $location.path('/'+num);
  }

  $scope.friends = [
    {name:'John',age:25},
    {name:'Jessie',age:30},
    {name:'Johanna',age:28},
    {name:'Joy',age:15},
    {name:'Mary',age:28},
    {name:'Mary',age:28},
    {name:'Mary',age:28},
    {name:'Mary',age:28},
    {name:'Mary',age:28},
    {name:'Mary',age:28},
    {name:'Mary',age:28},
    {name:'Mary',age:28},
    {name:'Mary',age:28},
    {name:'Mary',age:28},
    {name:'Mary',age:28},
    {name:'Mary',age:28},
    {name:'Mary',age:28},
    {name:'Peter',age:22}
  ]
})
