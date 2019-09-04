var fs=require("fs")

// $,ajax({
// 	...
// 	success:function(data){

// 	}
// })

// 第一个参数：文件路径
// 第二个参数：文件内容
fs.writeFile("./data/你好.md", "大家好，给大家介绍一下，我是Node.js",function(error){
	// console.log("文件导入成功");
	// console.log("error")
	if(error){
		console.log("写入失败了")
	}else {
		console.log("写入成功了")
	}
})