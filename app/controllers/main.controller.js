const path = require('path'),
	  bookModel = require(path.resolve(__dirname, '../models/book.model')),
	  commentModel = require(path.resolve(__dirname, '../models/comment.model'));

// 主页面
exports.mainPage = (req, res) => {
	let pageSize = req.query.pageSize ? +req.query.pageSize : 10,
		pageNum = req.query.pageNum ? +req.query.pageNum : 1;
	bookModel.page({}, pageNum, pageSize)
		.then((result) => {
			return res.render('index/index', {
				pageNum: result.pageNum,
				pageSize: result.pageSize,
				pageSum: Math.ceil(result.count / result.pageSize),
				data: result.data
			});
		});
};

// 详情页面
exports.detailPage = (req, res) => {
	bookModel.findOne({_id: req.params.id})
		.then((detailResult) => {
			commentModel.find({bookId: req.params.id})
				.then((commentResult) => {
					return res.render('index/detail', {
						detail: detailResult,
						comment: commentResult
					});
				});
			
		});
};