var http=require('http')
var fs=require('fs')
var template=require('art-template')

var server=http.createServer()

var wwwDir="D:/ApacheTmp/www"

server.on('request',function(req,res){
	var url =req.url
	fs.readFile('./template-apache.html',function(err,data){
       if(err){
       	 return res.end('404 Not Found')
       }
       //1.得到wwwDir目录列表中的文件名和目录名
       //    fs.readdir
       // 2.如何将得到的文件名和目录名替换到template.html中
       //    2.1在template.html中需要替换的位置预留一个特殊的标记（就像以前使用模板引擎的标记一样）
       //    2.2根据filess生产需要的HTNL内容
       fs.readdir(wwwDir, function(err,files){
       	if(err){
       		return res.end('文件目录不存在')
       	}
        // 这里只需要使用模板引擎解析替换data中的模板字符串就可以了
        // 数据就是files
        // 然后去你的template.html文件中编写你的模板语法就可以了
        
      var htmlStr=template.render(data.toString(),{
        title:'哈哈',
        files:files
      })
      // 发送解析替换过后的响应数据
      // 服务端渲染
      res.end(htmlStr)
    })
  })
})

server.listen(3000,function(){
	console.log('running.........')
})