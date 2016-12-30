/*获取用户信息服务*/

angular.module('myApp.services',[])
  .factory('userService',function(){
    return {
      getUsers: function(){
        return [{'username':'Tom','age':20},{'username':'Jerry','age':18}]
      }
    }
  })
