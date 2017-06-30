/**
 * 评论信息
 */
const path = require('path'),
	  mongoose = require(path.resolve(__dirname, '../../db.connect')),
	  Schema = mongoose.Schema;

const commentSchema = new Schema({
    bookId : { type: String }, // 书id
    from: { type: Schema.Types.ObjectId, ref: 'User' }, // 评论来自谁
    reply: [{ // 回复内容
    	from: {type: Schema.Types.ObjectId, ref: 'User'}, // 回复来自谁
    	to: {type: Schema.Types.ObjectId, ref: 'User'}, // 回复给谁
    	cont: String // 回复内容
    }],
    cont: { type: String }, // 内容
    createDate: { type: Date, default: Date.now() }, // 创建日期
});

module.exports = mongoose.model('Comment', commentSchema);