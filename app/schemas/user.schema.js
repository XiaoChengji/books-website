/**
 * 用户信息
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

const UserSchema = new Schema({
    name: { type: String }, //用户账号
    password: { type: String }, //密码
    avatar: { type: String, default: '1' }, //头像
    createDate: { type: Date, default: new Date() }, //注册时间
    roles: { type: Number, default: 0 } // 角色,0 普通用户,1 管理员,2 超级管理员
});

// 设置name为索引,并设置唯一键值不允许重复
UserSchema.index({ name: 1 }, { unique: true });

UserSchema.pre('save', function(next) {
    //做点什么
    next();
});

module.exports = mongoose.model('User', UserSchema);
