// require是一个方法
// 它的作用就是来加载模块的
// 在node中，模块有三种：
//    具名的核心模块，例如fs、http
//    用户自己编写的文件模块
//    相对路径必须./

// 在node中，没有全局作用域,只有模块作用域
// 外部访问不到内部
// 内部也访问不到外部

// 既然模块作用域，那如何让模块域模块之间进行通信
// 有时候，我们加载文件模块的目的不是简简单单执行里面的代码，更重要是为了使用里面的方法

var foo='aaa'

function add(x,y){
	return x+y

}

console.log('a start')
// 推荐：可以省略引入文件的后缀名
require('./b')

console.log("a end")

console.log("foo的是：",foo);