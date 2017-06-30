var Comment = require("../schemas/comment.schema");

/**
 * 插入
 */
function insert(data) {
    var result = new Comment(data);
    return new Promise((resolve, reject) => {
        result.save((err, res) => {
            err && reject(err);
            resolve(res);
        });
    });
}

/**
 * 修改
 */
function update(where, data) {
    return new Promise((resolve, reject) => {
        Comment.update(where, data, (err, result) => {
            err && reject(err);
            resolve(result);
        });
    });
}


/**
 * 查询
 */
function find(where) {
    return new Promise((resolve, reject) => {
        Comment.find(where)
            .populate('from', 'name')
            .populate('reply.from reply.to', 'name')
            .exec((err, result) => {
                err && reject(err);
                resolve(result);
            });
    });
}

/**
 * 查询
 */
function findOne(where) {
    return new Promise((resolve, reject) => {
        Comment.findOne(where)
            .exec((err, result) => {
                err && reject(err);
                resolve(result);
            });
    });
}

/**
 * 删除
 */
function del(where) {
    return new Promise((resolve, reject) => {
        Comment.remove(where, (err, data) => {
            err && reject(err);
            resolve(data);
        });
    });
}

module.exports = {
    insert: insert,
    update: update,
    find: find,
    findOne: findOne,
    del: del
};