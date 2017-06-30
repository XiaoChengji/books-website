var User = require("../schemas/user.schema");

/**
 * 插入
 */
function insert(data) {
    var user = new User(data);
    return new Promise((resolve, reject) => {
        user.save(function(err, res) {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
}

/**
 * 修改
 */
function update(where, data) {
    return new Promise((resolve, reject) => {
        User.update(where, data, function(err, res) {
            err && reject(err);
            resolve(res);
        })
    });
}

/**
 * 根据_id修改数据
 */
function findByIdAndUpdate(id, data) {
    User.findByIdAndUpdate(id, updatestr, function(err, res) {
        if (err) {
            console.log("Error:" + err);
        } else {
            console.log("Res:" + res);
        }
    })
}

/**
 * 删除数据
 */
function del(where) {
    return new Promise((resolve, reject) => {
        User.remove(where, function(err, res) {
            err && reject(err);
            resolve(res);
        });
    });
}

/**
 * 查询
 */
function getByConditions(where) {
    // 模糊查询
    // var whereStr = {'username':{$regex:/m/i}};

    // 只输出username字段
    // var opt = {"username": 1 ,"_id": 0};
    return new Promise((resolve, reject) => {
        User.find(where, function(err, res) {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });  
    });
}

/**
 * 数量
 */
function getCountByConditions(where) {
    User.count(where, function(err, res) {
        if (err) {
            console.log("Error:" + err);
        } else {
            console.log("Res:" + res);
        }
    })
}

/**
 * 分页查询
 */
function getByPager(where, page, sort) {
    // page.pageSize = 5; //一页多少条
    // page.currentPage = 1; //当前第几页
    // var sort = { 'logindate': -1 }; //排序（按登录时间倒序）
    // var condition = {}; //条件
    // var skipnum = (page.currentPage - 1) * pageSize; //跳过数
    User.find(where).skip((page.currentPage - 1) * page.pageSize).limit(page.pageSize).sort(sort).exec(function(err, res) {
        if (err) {
            console.log("Error:" + err);
        } else {
            console.log("Res:" + res);
        }
    })
}

// Model.distinct(field, [conditions], [callback])　// 去重
// Model.findOne(conditions, [fields], [options], [callback])　// 查找一条记录
// Model.findOneAndRemove(conditions, [options], [callback])　// 查找一条记录并删除
// Model.findOneAndUpdate([conditions], [update], [options], [callback])　// 查找一条记录并更新

module.exports = {
    insert: insert,
    update: update,
    findByIdAndUpdate: findByIdAndUpdate,
    del: del,
    getByConditions: getByConditions,
    getCountByConditions: getCountByConditions,
    getByPager: getByPager
};