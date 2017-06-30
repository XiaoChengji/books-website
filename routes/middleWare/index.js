// 检测是否登录
exports.checkLogin = (req, res, next) => {
	if (!req.session.user) {
		console.log('请登录');
		return res.redirect('/user/login');
	}
	next();
};

// 检测管理员权限
exports.checkAdmin = (req, res, next) => {
	if (req.session.user.roles < 1) {
		console.log('非法用户');
		return res.redirect('/');
	}
	next();
};