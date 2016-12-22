var express = require('express');
var router = express.Router();

/* GET users listing. */
var user = require('./usera');
//定义get方法获取用户列表
router.get('/', user.list);
//定义get方法获取指定ID的用户
router.get('/:id',user.get);
//定义一个delete方法删除指定用户的id
router.delete('/:id',user.delete);
//定义一个post方法添加用户
router.post('/',user.add);
//定义put方法更新用户
router.put('/:id',user.update);
//定义login方法处理用户登录
router.post('/login',user.login);


//加入一个options请求处理方法
router.options('/',function(req,res){
	//设置为请求域或*
	res.setHeader('Access-Control-Allow-Origin',req.headers.origin);
	//设置允许请求
	res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,DELETE,OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');

	console.log(req.headers)
	console.log(res._headers)
});

module.exports = router;
