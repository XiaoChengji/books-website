const path = require('path'),
      express = require('express'),
	  router = express.Router(),
	  middleObj = require(path.resolve(__dirname, 'middleWare')),
	  mainCtrl = require(path.resolve(__dirname, '../app/controllers/main.controller'));

// 首页
router.get('/', middleObj.checkLogin, mainCtrl.mainPage);

// 详情页
router.get('/detail/:id', middleObj.checkLogin, mainCtrl.detailPage);

module.exports = router;