const path = require('path'),
      express = require('express'),
	  router = express.Router(),
	  userCtrl = require(path.resolve(__dirname, '../app/controllers/user.controller'));

// 登录页
router.get('/login', userCtrl.loginPage);

// 注册页
router.get('/register', userCtrl.registerPage);

// 注册
router.post('/save', userCtrl.register);

// 登录
router.post('/login/enter', userCtrl.login);

// 登出
router.get('/login/out', userCtrl.loginOut);

module.exports = router;