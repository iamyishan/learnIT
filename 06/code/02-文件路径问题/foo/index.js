
// 模块中的路径标识和文件操作中的相对路径标识不一致
// 模块中的路径标识就是相对于当前文件模块，不受执行 node 命令所处路径影响
var fs = require('fs')
var path = require('path')


// 在ndoe中，./a.txt 不是相对于当前文件路径
// ./a.txt 相对于执行 node 命令所处的终端路径
// 这不是错误，Node 就是这样设计的
// 就是说，文件操作路径中，相对路径设计的就是相对于执行 node 命令所处的路径

// 1.
// fs.readFile('./a.txt', 'utf8', function(err,data){
// 	if(err){
// 		throw err
// 	}
// 	console.log(data)
// });

// 解决办法，读取绝对路径
// fs.readFile('E:/own/computer/nodejs/06/code/foo/a.txt', 'utf8', function(err,data){
// 	if(err){
// 		throw err
// 	}
// 	console.log(data)
// });

// console.log(__dirname + '/a.txt')
// E:\own\computer\nodejs\06\code\foo

fs.readFile(path.join(__dirname, './a.txt'), 'utf8', function (err, data) {
  if (err) {
    throw err
  }
  console.log(data)
})

