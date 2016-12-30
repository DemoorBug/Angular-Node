var express = require('express');
var router = express.Router();
//引入mongoose
var mongoose = require('mongoose');

var User;

//链接数据库
mongoose.connect('mongodb://localhost/teachSys',function(err) {
  if(err) console.log(err);
  //如果没有错误则连接成功
  else {
    var Schema = mongoose.Schema;
    //定义Users文档
    var Users = new Schema({
      username: String,
      age:Number
    });
    //声明一个User模型,使用它和数据库交互
    User = mongoose.model('User',Users);
  }
})
//返回用户列表
router.get('',function(req,res,next){
  //获取用户
  User.find({},function(err,users){
    //错误处理
    handleError(err);
    //没有错误则查询成功
    if(users.length == 0) {
      //如果没有数据则插入预定义的数据
      var user = new User({username:'Tom',age:20})
      user.save(function(err){
        handleError(err);
        console.log('插入了一个用户Tom')
      });
      //插入第二个用户
      user = new User({username:'Jerry',age:18})
      user.save(function(err){
        handleError(err);
        console.log('插入了一个用户Jerry')

        //查询插入的用户列表并返回
        User.find({},function(err,users){
          handleError(err)
          //返回数据
          res.render('users',{title:'用户列表',users:users});
        })
      });
    }else {
      //如果已经存在数据则直接返回结果
      res.render('users',{title:'用户列表',users:users});
    }
  })
})

//删除
router.post('/remove',function(req,res){
  User.findById(req.body._id,function(err,user){
    handleError(err);
    //是否查询到_id对应的用户
    if(user){
      user.remove(function(err){
        handleError(err);
        res.send('删除成功')
      });
    }else {
      res.send('没有该用户')
    }
  })
})

router.get('/update/:_id',function(req,res){
  User.findById(req.params._id,function(err,user){
    handleError(err);
    //是否查询到_id对应的用户
    if(user){
      //跳转至新页面
      res.render('userUpdate',{user:user})
    }else {
      res.send('更新用户不存在')
    }
  })
})

router.post('/update',function(req,res){
  User.update({_id:req.body._id},{username:req.body.username,age:req.body.age},{},function(err,rows_updated){
    //错误处理
    handleError(err);
    //如果没错误则更新成功
    res.send('更新成功')
  })
})


function handleError(err){
  if(err) return console.log(err) ;
}



module.exports = router;
