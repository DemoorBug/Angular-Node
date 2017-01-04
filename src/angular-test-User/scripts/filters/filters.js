angular.module('myApp.filters',[])
  .filter('roleName',function(){ //将角色数字转换为角色名称
    return function(role){
      //role是角色的数字
      switch(role){
        case 1:
          return '管理员';
        case 2:
          return '教师';
        case 3:
          return '学生';
        default : return '未知';
      }
    }
  })
