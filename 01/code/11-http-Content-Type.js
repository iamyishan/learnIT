// requrie
// 端口号

var http=require("http")

var server=http.createServer()

server.on("request",function(req,res){
	// 在服务端默认发送的数据，其实是utf-8编码内容
	// 但是浏览器不知道你是utf-8编码的内容
	// 浏览器在不知道服务器响应内容的情况下会按照当前操作系统的默认编码去解析
	// 中文操作系统默认是gbk
	//指定浏览器的编码
	//在http协议中，Content-Type就是用来告知对方我给你发送的数据内容是什么内容
		// res.setHeader("Content-Type",'text/plain;charset=utf-8')
		// res.end("hello 中国")

	var url=req.url
	if(url==="/plain"){
		// text/plain是普通文本
		res.setHeader("Content-Type",'text/plain;charset=utf-8')
		res.end("hello 中国")
	}else if(url==="/html"){
		// 如果发送的是html,告诉浏览器是text/html
	    res.setHeader("Content-Type",'text/html;charset=utf-8')
	    res.end('<p>hello html<a href="">点我</a></p>')
	}
})

server.listen(3000,function(){
	console.log("server is sunning.....");
})