var express = require('express');
var router = express.Router();

/* GET users listing. */
var user = require('./user');
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

module.exports = router;
