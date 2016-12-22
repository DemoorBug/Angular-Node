//该文件中定义了User相关的操作方法接口

//获取用户数据
var users = require('../model/usera').users;

//登录方法
exports.login = function(req,res) {
	res.setHeader('Content-Type','application/json;charset=utr-8')
	// if(req.headers.origin) res.setHeader('Access-Control-Allow-Origin',req.headers.origin);
	//验证登录
	for(var i=0;i<users.length;i++){
		if(users[i].name == req.body.username && users[i].password == req.body.password){
			//用户名和密码均相同登录成功
			res.send({status:'success',token:'AUTH_TOKEN',role:2})
			return;
		}
	}
	//登录失败
	res.send({status:'failure'});
}

//列表所有用户数据
exports.list = function(req,res){
	res.setHeader('Content-Type','application/json;charset=utr-8')
	console.log(req.headers.origin)

	if(req.headers.origin) res.setHeader('Access-Control-Allow-Origin',req.headers.origin);
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
	// res.setHeader('Access-Control-Allow-Headers','token');
	console.log('yes')
	//如果没有token，则未登录，不能返回数据
	if(req.headers.token == 'AUTH_TOKEN') {
		res.send(users);
	}else {
		//用户尚未认证，返回401错误
		res.status(401);
		res.end();
	}
	
}

//返回指定ID的用户数据
exports.get = function(req,res){
	res.setHeader('Content-Type','application/json;charset=utr-8');
	//获取指定id
	console.log('req.params.id'+req.params.id)
	if(req.params.id == 'jsonp') return res.jsonp({status:users});
	res.send(users[req.params.id])
}
//删除指定用户的数据
exports.delete = function(req,res){
	res.setHeader('Content-Type','application/json;charset=utr-8');
	//删除指定索引的数据
	for(var i=0;i<users.length;i++){
		if(users[i].id==req.params.id) {
			users.splice(i,1);
			break;
		}
	}
	res.send({status:'success',message:"删除用户成功"});
	//在控制台输出删除后的数据
	console.log(users);
}
//更新操作
exports.update = function(req,res){
	res.setHeader('Content-Type','application/json;charset=utr-8');
	//更新指定索引的数据
	for(var i=0;i<users.length;i++){
		if(users[i].id==req.body.id) {
			users[i] = req.body;
			break;
		}
	}
	res.send({status:'success',message:"更新用户成功"});
	//在控制台输出更新后的数据
	console.log(users);
}
//添加一个用户数据
exports.add = function(req,res){
	res.setHeader('Content-Type','application/json;charset=utr-8');
	//输出一个用户数据
	console.log(req.body)
	users.push(req.body);
	res.send({status:'success',message:"增加用户成功"});
	//在控制台输出更新后的数据
	console.log(users);
}
