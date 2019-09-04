

//1.加载http核心模块
var http=require("http")

// 2.使用http.createServer()方法创建一个Web服务器
//返回一个Server实例
var server=http.createServer()

// 3.服务器干嘛

server.on("request",function(request,response){
	
console.log("收到客户端的请求了,请求来了,请求路径是："+request.url);
console.log("是谁在请求我的客户端，他的ip和端口号是：",response.socket.remoteAddress,response.socket.remotePort)
// write可以使用多次，但最后一定要使用end来结束响应，否则客户端会一直等
response.write("hello")
response.write("node.js")
//告诉客户端，我的话说完了，你可以呈递给用户了
response.end()
})
// 4.绑定端口号，启动服务器
server.listen(3000,function(){
	console.log("服务器启动成功了，可以通过http://127.0.0.1:3000/来进行访问");
})