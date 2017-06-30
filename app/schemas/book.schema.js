/**
 * 书籍信息
 */
const path = require('path'),
	  mongoose = require(path.resolve(__dirname, '../../db.connect')),
	  Schema = mongoose.Schema;

// Schema Types内置类型如下:
// 	 String
// 　Number
// 　Boolean | Bool
// 　Array
// 　Buffer
// 　Date
// 　ObjectId | Oid
// 　Mixed

const BookSchema = new Schema({
    name : { type: String }, // 书名
    author: {type: String }, // 作者
    publisher: {type: String }, // 出版社
    imageUrl: { type: String }, // 图片地址
    desc: { type: String }, // 描叙
    cont: { type: String } // 内容
});

BookSchema.pre('save', function(next) {
    //做点什么
    next();
});

module.exports = mongoose.model('Book', BookSchema);