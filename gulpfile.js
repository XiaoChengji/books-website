'use strict';

//引入 gulp 和 nodemon livereload 插件  
const gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    livereload = require('gulp-livereload');

// 一些文件的路径  
var paths = {
    client: [
        'public/js/**/*.js',
        'public/css/**/*.css'
    ],
    server: {
        index: 'app.js'
    }
};

// nodemon 的配置  
var nodemonConfig = {
    script: paths.server.index,
    ignore: [
        "public/**",
        "views/**"
    ],
    env: {
        "NODE_ENV": "development"
    }
};

// 使用 nodemone 跑起服务器
// gulp.task('serve', ['livereload'], function() {
gulp.task('serve', function() {
    return nodemon(nodemonConfig);
});


// 当客户端被监听的文件改变时，刷新浏览器  
gulp.task('livereload', function() {
    livereload.listen();
    var server = livereload();
    return gulp.watch(paths.client, function(event) {
        // server.changed(event.path); 
        livereload.changed(event.path);
    });
});

// default 任务， 同时开启 serve、livereload 任务
// gulp.task('default', ['serve', 'livereload']);
gulp.task('default', ['serve']);
