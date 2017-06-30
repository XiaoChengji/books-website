const path = require('path'),
	  userModel = require(path.resolve(__dirname, '../models/user.model')),
	  vCrypto = require(path.resolve(__dirname, '../../util/vCrypto'));

// 登录页面
exports.loginPage = (req, res) => {
	res.render('user/login');
};

// 注册页面
exports.registerPage = (req, res) => {
	res.render('user/register');
};

// 注册
exports.register = (req, res) => {
	req.body.password = vCrypto.getSha1(req.body.password);
	userModel.insert(req.body)
		.then(() => {
			res.redirect('/user/login');
		});
};

// 登录
exports.login = (req, res) => {
	userModel.getByConditions({name: req.body.name})
		.then((data) => {
			if (data.length > 0) {
				if (data[0].password === vCrypto.getSha1(req.body.password)) {
					console.log('登录成功');
					req.session.user = data[0];
					res.redirect('/');
				} else {
					console.log('登录失败');
					res.redirect('/user/login');
				}
			} else {
				console.log('用户名或账号错误');
				res.redirect('/user/login');
			}
		}, (error) => {
			console.log(error);
		});
};

// 登出
exports.loginOut = (req, res) => {
	delete req.session.user;
	res.redirect('/user/login');
};