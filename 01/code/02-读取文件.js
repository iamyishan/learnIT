//浏览器中JavaScript是没有文件操作的能力的
//但是Node中JavaScript具有文件操作能力

// fs是file-system的简写，就是文件系统的意思
//在Node中如果想要进行文件操作，就必须引入fs这个核心模块
//fs这个核心模块中，就提供了所以文件操作相关的API

//1.使用require方法加载fs核心模块
var fs=require("fs")

//2.读取文件
// 第一个参数就是要读取的文件路径
// 第二个参数是一个回调函数
//           data 
//             如果读取成功，data就是读取到的数据，error为null
//              如果读取失败，error就是错误对象,data为undefined
fs.readFile("./data/a.txt", function(error,data){
	// console.log(data)
	//<Buffer 68 65 6c 6c 6f 2e 74 78 74 21 21 21 21 21 21 21 21 21 21 21 21>
	// 文件存储其实都是二进制数据0 1，这儿是转为16进制
	//需要toString转为我们认识的字符
// console.log(data.toString())


// console.log(error)
// console.log(data)

if(error){
	console.log('读取文件失败')
}else{
	console.log(data.toString())
}
});