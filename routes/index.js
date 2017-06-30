const path = require('path'),
	mainRouter = require(path.resolve(__dirname, 'main.router')),
	userRouter = require(path.resolve(__dirname, 'user.router')),
	commentRouter = require(path.resolve(__dirname, 'comment.router')),
	adminRouter = require(path.resolve(__dirname, 'admin.router'));

module.exports = (app) => {
	// 设置首页路由
	app.use('/', mainRouter);

	// 设置用户路由
	app.use('/user', userRouter);

	// 设置评论路由
	app.use('/comment', commentRouter);

	// 设置后台路由
	app.use('/admin', adminRouter);
};
