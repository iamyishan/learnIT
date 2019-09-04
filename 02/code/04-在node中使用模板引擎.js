// art-template
// art-template不仅可以在浏览器使用，也可以在node中使用

//安装
//   npm install art-template
//   该命令在哪儿执行就会把包下载到哪儿，默认会下载到node_modules目录中
//   node_modules不要改，也不支持改

// 在Node中使用art-template模板引擎、
// 模板引起最早就是诞生于服务器领域，后来发展到了前端。

// 1.安装 npm install art-template
// 2.在需要使用的文件模块中加载art-template
//   只需要使用require方法加载就可以了：require('art-template')
//   参数中的art-template就是你下载的包名字
//   也就是你install的名字是什么，则你require什么
// 3.查文档，使用模板引擎的API


var template=require('art-template')
/*var tplStr=`
<!DOCTYPE html>
<html>
<head>
	<title></title>
</head>
<body>
	<p>大家好，我叫：{{ name }}</p>
	<p>我今年{{ age }}岁</p>
	<p>我来自{{ province }}</p>
	<h1>我喜欢：{{each hobbies}} {{ $value }} {{/each}}</h1>
</body>
</html>
`

var ret=template.render(tplStr,{
  		name:'Jack',
  		age:18,
  		province:'重庆市',
  		hobbies:['写代码','唱歌','打游戏']
  	})
console.log(ret)
*/

fs=require('fs')
fs.readFile('./tpl.html',function(err,data){
	if(err){
		return console.log('读取文件是变了')
	}
	// 默认读取到的data是二进制数据
	// 而模板引擎的render方法需要接收的是字符串
	// 所以我们在这里需要把data二进制数据转化为"字符串"才可以给模板引擎使用
	var ret=template.render(data.toString(),{
  		name:'Jack',
  		age:18,
  		province:'重庆市',
  		hobbies:['写代码','唱歌','打游戏'],
  		title:'个人信息'
  	})
    console.log(ret)
})
