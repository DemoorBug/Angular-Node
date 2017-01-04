var express = require('express');
var router = express.Router();
//用户模型
var User = require('../models/User.js')

//链接数据库
/*
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
*/

//跨域的预检查处理
router.options('/login',function(req,res){
  res.setHeader('Access-Control-Allow-Origin',req.headers.origin);
  res.setHeader('Access-Control-Allow-Methods','OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers','Content-Type');
  res.send();
})
//查询列表
router.options('/',function(req,res){
  res.setHeader('Access-Control-Allow-Origin',req.headers.origin);
  res.setHeader('Access-Control-Allow-Methods','OPTIONS,GET,POST');
  res.setHeader('Access-Control-Allow-Headers','Content-Type');
  res.send();
})
router.options('/:_id',function(req,res){
  res.setHeader('Access-Control-Allow-Origin',req.headers.origin);
  res.setHeader('Access-Control-Allow-Methods','OPTIONS,DELETE,PUT');
  res.setHeader('Access-Control-Allow-Headers','Content-Type');
  res.send();
})

//登陆接口
router.post('/login',function(req,res){
  //设置响应头
  res.setHeader('Content-Type','application/json;charset=utf-8');
  res.setHeader('Access-Control-Allow-Origin',req.headers.origin);

  //查询是否存在登陆信息对应的用户
  console.log(req.body)
  User.findOne(req.body,function(err,user){
    if(err){
      console.log(err)
      return
    }
    if(user){
      //登陆成功
      res.send({status:'success',user:user});
    }else{
      res.send({status:'failure'});
    }
  })
})


//返回用户列表
router.get('/',function(req,res,next){
  res.setHeader('Content-Type','application/json;charset=utf-8');
  res.setHeader('Access-Control-Allow-Origin',req.headers.origin);

  //根据请求用户角色获取用户列表
  //1.管理员查询所有教师；
  //2.教师查询其所有教师；
  if(req.query.role == 1) {
    //1.管理员查询所有教师
    User.find({role:2},function(err,users){
      if(err){
        console.log(err)
        return;
      }
      res.send(users);
    });
  }else if(req.query.role == 1){
    User.find({role:3},function(err,users){
      if(err){
        console.log(err)
        return;
      }
      res.send(users);
    });
  }else {
    //......
    res.send([]);
  }


/*  操作mongodb时候的数据，可以作为参考
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
  */
})

//删除用户
router.delete('/:_id',function(req,res){
  res.setHeader('Content-Type','application/json;charset=utf-8');
  res.setHeader('Access-Control-Allow-Origin',req.headers.origin);

  //删除对应用户
  console.log('删除用户ID:'+req.params._id);
  //查找并删除用户
  User.findByIdAndRemove(req.params._id,function(err,users){
    if(err){
      console.log(err);
    }
    if(users) {
      res.send({status:'success'});
    }else {
      res.send({status:'failure'});
    }
  })

})

//添加用户逻辑
router.post('/',function(req,res){
  res.setHeader('Content-Type','application/json;charset=utf-8');
  res.setHeader('Access-Control-Allow-Origin',req.headers.origin);

  //添加操作
  console.log('添加用户'+req.body)
  var user = new User(req.body)
  user.save(function(err,user){
    if(err){
      console.log(err);
    }
    if(user) {
      res.send({status:'success'});
    }else {
      res.send({status:'failure'});
    }
  });
/*
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
  */
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
