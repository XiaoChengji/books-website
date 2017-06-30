const path = require('path'),
	  express = require('express'),
	  router = express.Router(),
	  middleObj = require(path.resolve(__dirname, 'middleWare')),
	  adminCtrl = require(path.resolve(__dirname, '../app/controllers/admin.controller'));
	  
// 后台用户列表页
router.get('/user/list', middleObj.checkLogin, middleObj.checkAdmin, adminCtrl.userListPage);

// 后台用户表单页
router.get('/user/form', middleObj.checkLogin, middleObj.checkAdmin, adminCtrl.userFormPage);

// 后台用户删除
router.get('/user/delete/:id', middleObj.checkLogin, middleObj.checkAdmin, adminCtrl.delUser);

// 后台用户修改
router.post('/user/update', middleObj.checkLogin, middleObj.checkAdmin, adminCtrl.updateUser);

// 后台列表页
router.get('/list', middleObj.checkLogin, middleObj.checkAdmin, adminCtrl.listPage);

// 后台填表页
router.get('/form', middleObj.checkLogin, middleObj.checkAdmin, adminCtrl.formPage);

// 后台删除
router.get('/del/:id', middleObj.checkLogin, middleObj.checkAdmin, adminCtrl.del);

// 后台保存
router.post('/save', middleObj.checkLogin, middleObj.checkAdmin, adminCtrl.save);

// 导入页面
router.get('/import/:type', middleObj.checkLogin, middleObj.checkAdmin, adminCtrl.importPage);

// 导入豆瓣API
router.post('/import/douban', middleObj.checkLogin, middleObj.checkAdmin, adminCtrl.importDouban);

module.exports = router;