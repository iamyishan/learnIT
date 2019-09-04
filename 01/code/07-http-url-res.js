var http=require("http")

// 1.创建Server
var server=http.createServer();

// 2.监听request请求事件，设置请求
server.on("request",function(req,res){
	console.log("收到请求了，请求路径是："+req.url)
	// res.write("hello")
	// res.write("world")
	// res.end()
	
	//上面的方式比较麻烦，推荐使用更简单的方式，直接end的同时加内容
	// res.end("hello")

	// 根据不同的请求路径发送不同的响应结果
	// 1.获取请求路径
	//   req.url获取到的是端口之后的那一部分路径
	//   也就是说所有的url都是以/开头的
	// 2.判断路径处理响应
	var url=req.url

	// if(url=="/"){
	// 	res.end('index page')
	// }else if(url==="/login"){
	// 	res.end("login page")
	// }else{
	// 	res.end("404 Not Found")
	// }
	if(url==="/products"){
		var products=[
	
	{
		name:"苹果X",
		price:8888
	},
	{
		name:"菠萝 X",
		price:5000
	},
	{
		name:"小辣椒",
		price:1999
	}
	]
res.end(JSON.stringify(products))
	//响应内容只能是二进制数据或字符串
	// 数字、数组、对象、布尔值都不行
	// res.end(123) 无法响应
}
})
// 3.绑定端口，启动服务
server.listen(2000,function(){
	console.log("服务器启动成功，可以访问了。。。")
})