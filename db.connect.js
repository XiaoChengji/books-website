const path = require('path'),
	  mongoose = require('mongoose'),
	  config = require('./config');

// 解决mongoose报Promise错误 (node:5684)
// 错误: DeprecationWarning: Mongoose: mpromise (mongoose's default promise library) is deprecated, plug in your own promise library instead: http://mongoosejs.com/docs/promises.html
mongoose.Promise = global.Promise;
let db = mongoose.connect(config.mongodb, {
	auto_reconnect: true,
	poolSize: 10
});

db.connection.on('open', () => { 
	console.log('——数据库连接成功！——'); 
});

db.connection.on("error", (error) =>  { 
	console.log('数据库连接失败：' + error); 
}); 

module.exports = mongoose;