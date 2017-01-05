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
