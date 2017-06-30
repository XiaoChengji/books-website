var Book = require("../schemas/book.schema");

/**
 * 插入
 */
function insert(data) {
    var result = new Book(data);
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
function findByIdAndUpdate(id, data) {
    return new Promise((resolve, reject) => {
        Book.findByIdAndUpdate(id, data, (err, res) => {
            err && reject(err);
            resolve(res);
        });
    });
}

/**
 * 查询
 */
function find(where) {
    return new Promise((resolve, reject) => {
        Book.find(where, (err, data) => {
            err && reject(err);
            resolve(data);
        });
    });
}

/**
 * 单条查询
 */
function findOne(where) {
    return new Promise((resolve, reject) => {
        Book.findOne(where, (err, data) => {
            err && reject(err);
            resolve(data);
        });
    });
}

/**
 * 分页查询
 */
function page(where, pageNum, pageSize) {
    return new Promise((resolve, reject) => {
        let start = (pageNum - 1) * pageSize;
        // Book.find(where).skip(start).limit(pageSize).populate(populate).sort(sortParams).exec(function (err, doc) {
        Book.count(where, (err, count) => {
            Book.find(where).skip(start).limit(pageSize).exec((err, data) => {
                err && reject(err);
                resolve({pageNum, pageSize, count, data});
            });
        });
    });
}

/**
 * 删除
 */
function del(where) {
    return new Promise((resolve, reject) => {
        Book.remove(where, (err, data) => {
            err && reject(err);
            resolve(data);
        });
    });
}

module.exports = {
    insert: insert,
    findByIdAndUpdate: findByIdAndUpdate,
    find: find,
    findOne: findOne,
    page: page,
    del: del,
};