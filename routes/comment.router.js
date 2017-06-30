const path = require('path'),
	  express = require('express'),
	  router = express.Router(),
	  middleObj = require(path.resolve(__dirname, 'middleWare')),
	  commentCtrl = require(path.resolve(__dirname, '../app/controllers/comment.controller'));
	  
// 评论
router.post('/add', middleObj.checkLogin, commentCtrl.add);

module.exports = router;