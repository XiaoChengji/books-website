const path = require('path'),
	  commentModel = require(path.resolve(__dirname, '../models/comment.model'));

// 评论
exports.add = (req, res) => {
	if (req.body.to) {
		commentModel.findOne({_id: req.body.id,bookId: req.body.bookId})
			.then((result) => {
				result.reply.push({
					from: req.body.from,
					to: req.body.to,
					cont: req.body.cont
				});
				commentModel.update({_id: req.body.id}, result)
					.then((data) => {
						console.log('回复成功');
						res.redirect('/detail/'+req.body.bookId);
					});
			})

	} else {
		commentModel.insert(req.body)
			.then(() => {
				console.log('评论成功');
				res.redirect('/detail/'+req.body.bookId);
			});
	}

};