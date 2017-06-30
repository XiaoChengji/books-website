const path = require('path'),
    config = require(path.resolve(__dirname, 'config')),
    port = process.argv[3] || config.port,
    express = require('express'),
    // cookiePareser = require('cookie-parser'),
    session = require('express-session'),
    MongoStore = require('connect-mongo')(session),
    bodyParser = require('body-parser'),
    app = express(),
    routers = require(path.resolve(__dirname, 'routes'));

// 设置模板文件
app.set('view engine', 'jade');
// 设置模板路径
app.set('views', path.resolve(__dirname, 'app/views'));

// 设置静态文件访问路径
app.use('/static', express.static(path.resolve(__dirname, 'public')));

// 对post请求的请求体进行解析(bodyParser > cookiePareser > session顺序很重要,否则可能会出现一刷新页面req.session丢失)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// cookie 中间件
// app.use(cookiePareser(config.session.key));

// session 中间件
app.use(session({
    name: config.session.key, // 设置 cookie 中保存 session id 的字段名称
    secret: config.session.secret, // 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
    resave: true, // 强制更新 session
    saveUninitialized: false, // 设置为 false，强制创建一个 session，即使用户未登录
    cookie: {
        maxAge: config.session.maxAge // 过期时间，过期后 cookie 中的 session id 自动删除
    },
    store: new MongoStore({ // 将 session 存储到 mongodb
        url: config.mongodb // mongodb 地址
    })
}));

//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
    next();
});

// 设置模板全局变量
app.locals.book = {
    title: 'V 书',
    description: '提供各类书籍的介绍'
};

// 设置错误路由
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// 将用户信息设置模板变量
app.use(function(req, res, next) {
    // console.log('session:', req.session.user);
    res.locals.user = req.session.user;
    next();
});

// 启动路由
routers(app);

app.listen(port, function() {
    console.log('server start');
});
