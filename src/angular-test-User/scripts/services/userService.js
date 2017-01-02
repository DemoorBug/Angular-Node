/*获取用户信息服务*/

angular.module('myApp.services',['restangular'])
  .factory('UserService',function(Restangular){
    var user;//当前用户信息
    //获取User资源：http://localhost:3000/users
    var User = Restangular.all('users');
    return {
      login: function(u){
        //获取http://localhost:3000/users/login
        return User.all('login').post(u)
      },
      setUser: function(u){
        user = u
      }
    }
  })
