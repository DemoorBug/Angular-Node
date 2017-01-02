var mongoose = require('mongoose')

var User;

//链接数据库
mongoose.connect('mongodb://localhost/teachSys1',function(err) {
  if(err) {
    console.log(err);
    throw err;
  };
  //如果没有错误则连接成功

})

//声明概要
var Schema = mongoose.Schema;

//定义Users文档
var Users = new Schema({
  username: String,
  password:String,
  role: Number
});
//声明一个User模型,使用它和数据库交互
User = mongoose.model('User',Users);

//如果没有管理员账号则创建之
User.findOne({username:'Admin',password: 'admin123'},function(err,admin){
  if(err){
    console.log(err);
    return;
  }
  if(!admin){
    //如果不存在则创建
    admin = new User({
      username:'Admin',
      password:'admin123',
      role:'1'
    });

    admin.save(function(){
      console.log('添加了一个管理员账号')
    })
  }else {
    console.log('已存在一个管理员账户'+ admin.username)
  }
})


module.exports = User;
