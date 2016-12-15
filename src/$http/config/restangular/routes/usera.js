//该文件中定义了User相关的操作方法接口

//获取用户数据
var users = require('../model/usera').users;

//列表所有用户数据
exports.list = function(req,res){
	res.setHeader('Content-Type','application/json;charset=utr-8')
	// 给用户返回数据
	res.send(users);
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
