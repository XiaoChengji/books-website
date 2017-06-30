const { parse } = require('url'), // 模块url的属性URL, node 6.10.0的是Url(其实6.10.0的这个Url方法估计跟8.1.0的不一样), node 8.1.0的是URL(存在版本问题)
	  http = require('http'),
      https = require('https');

exports.request = (url, data, option) => {
	let urlObj = parse(url), 
		httpServerOption = {
			hostname: urlObj.hostname,
			port: urlObj.port,
			path: urlObj.path,
			method: option.method,
			search: urlObj.search
		},
    	httpServerObj = option.isHttp ? http : https;
    return new Promise((resolve, reject) => {
    	// 使用 http.request() 必须总是调用 req.end() 来表明请求的结束，即使没有数据被写入请求主体
    	let req = httpServerObj.request(httpServerOption, (res) => {
    		let result = '';
	        res.setEncoding('utf8');
	        res.on('data', (chunk) => {
	            // 返回的chunk是buffer类型
	            result += chunk;
	        });

	        res.on('end', () => {
	        	resolve(result);
	        });

	        res.on('error', (e) => {
	            err && reject(e);
	        });
	    });
	    // req.write接受的参数必须是字符串或者Buffer类型(GET传参不会当成参数传输,需带在url上)
	    req.write(data);
	    req.end();
    });
};
