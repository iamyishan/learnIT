var http=require('http')
var fs=require('fs')

var server=http.createServer()

var wwwDir="D:/ApacheTmp/www"

server.on('request',function(req,res){
	var url =req.url
	fs.readFile('./template.html',function(err,data){
       if(err){
       	 return res.end('404 Not Found')
       }
    // 1. 如何得到 wwwDir 目录列表中的文件名和目录名
    //    fs.readdir
    // 2. 如何将得到的文件名和目录名替换到 template.html 中
    //    2.1 在 template.html 中需要替换的位置预留一个特殊的标记（就像以前使用模板引擎的标记一样）
    //    2.2 根据 files 生成需要的 HTML 内容
    // 只要你做了这两件事儿，那这个问题就解决了
       fs.readdir(wwwDir, function(err,files){
       	if(err){
       		return res.end('文件目录不存在')
       	}
       // 生成需要替换的内容
       var content = ''
       files.forEach(function(item){
       	// 在EcmaScript6的`字符串中，可以使用${}来引用变量
       content+=`
       <tr>
         <td data-value="apple/"><a class="icon dir" href="/D:/ApacheTmp/www/apple/">${item}/</a></td>
         <td class="detailsColumn" data-value="0"></td>
         <td class="detailsColumn" data-value="1564973878">2019/8/5 上午10:57:58</td>
       </tr>
      `
  })
       data=data.toString()
       data=data.replace('^_^', content)
       
       res.end(data)
	})

  })
})

server.listen(3000,function(){
	console.log('running.........')
})