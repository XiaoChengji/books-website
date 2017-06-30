const path = require('path'),
	  vCrypto = require(path.resolve(__dirname, '../../util/vCrypto')),
	  httpServer = require(path.resolve(__dirname, '../../util/server')),
	  userModel = require(path.resolve(__dirname, '../models/user.model')),
	  bookModel = require(path.resolve(__dirname, '../models/book.model'));

// 后台用户页面
exports.userListPage = (req, res) => {
	userModel.getByConditions({})
		.then((data) => {
			res.render('admin/userList', {data});
		});
};

// 后台修改用户页面
exports.userFormPage = (req, res) => {
	userModel.getByConditions({_id: req.query.id})
		.then((data) => {
			res.render('admin/userForm', {data: data[0]});
		});
};

// 后台修改用户信息
exports.updateUser = (req, res) => {
	userModel.update({_id: req.body.id}, {
		password: vCrypto.getSha1(req.body.password),
		roles: +req.body.roles
	})
	.then((data) => {
		if (req.body.id == req.session.user._id) {
			delete req.session.user;
			res.redirect('/user/login');
		} else {
			res.redirect('/admin/user/list');
		}
	});
};

// 后台删除用户
exports.delUser = (req, res) => {
	userModel.del({_id: req.params.id})
		.then(() => {
			res.redirect('/admin/user/list');
		});
};

// 后台列表页面
exports.listPage = (req, res) => {
	bookModel.find({})
		.then((result) => {
			res.render('admin/list', {data: result});
		});
};

// 后台录入页面
exports.formPage = (req, res) => {
	let data = {};
	if (req.query.id) {
		bookModel.findOne({_id: req.query.id})
			.then((result) => {
				data = result;
				res.render('admin/form', data);
			});
	} else {
		res.render('admin/form', data);
	}
};

// 删除
exports.del = (req, res) => {
	bookModel.del({_id: req.params.id})
		.then((result) => {
			res.redirect('/admin/list');
		});
};

// 保存(新增, 删除)
exports.save = (req, res) => {
	if (req.body._id) {
		bookModel.findByIdAndUpdate(req.body._id, req.body)
			.then(() => {
				res.redirect('/admin/list');
			});
	} else {
		delete req.body._id;
		bookModel.insert(req.body)
			.then(() => {
				res.redirect('/admin/list');
			});
	}
};

// 导入页
exports.importPage = (req, res) => {
	// req.params.type不使用toString,返回到页面的type值是0(包括req.query.type)
	res.render('admin/import', {type: req.params.type.toString()});
};

// 导入豆瓣书籍
exports.importDouban = (req, res) => {
	let url = `https://api.douban.com/v2/book/search?q=${req.body.q}&start=${req.body.start}&count=${req.body.count}&fields=id,title,summary,images,author,catalog,publisher`;
	// 由于豆瓣API请求地址是https,如使用http模块的get请求会收到Error: Protocol "https:" not supported. Expected "http:"错误
	httpServer.request(url, '', {isHttp: false, method: 'GET'})
		.then((result) => {
			let successCount = 0,
				errorCount = 0,
				resultObj = JSON.parse(result),
				start = resultObj.start,
				count = resultObj.count,
				total = resultObj.total,
				data = resultObj.books;
				taskArr = [];
			for (let index of Object.keys(data)) {
				// 只存数据完整的
				if (data[index].title && data[index].author && data[index].publisher && data[index].images && data[index].summary && data[index].catalog) {
					taskArr[index] = (() => {
						return new Promise((resolve, reject) => {
							bookModel.insert({
								name: data[index].title,
								author: data[index].author.join(','),
								publisher: data[index].publisher,
								imageUrl: data[index].images['large'],
								desc: data[index].summary,
								cont: data[index].catalog
							})
							.then((data) => {
								successCount += 1;
								resolve(data);
							}, (e) => {
								reject(e);
							});
						});
					})();
				} else {
					errorCount += 1;
				}
			}

			// Promise 尽可能多的去catch异常
			Promise.all(taskArr)
				.then(() => {
					console.log(`一共成功插入${successCount}，失败${errorCount}`);
					res.redirect('/');
				})
				.catch((e) => {
					console.log('插入数据存在异常: ', e);
				});
		}, (error) => {
			console.log(error);
		}).catch((e) => {
			console.log('存在异常:', e);
		});
};