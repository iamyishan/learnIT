// require方法有两个作用：
//   1.加载文件模块病执行里面的代码
//   2.拿到被加载文件模块导出的接口对象
// 
// 在每个文件模块中提供了一个对象:exports
// exports默认是一个空对象
// 你要做的是把所有需要被外部访问的成员挂到exports上
var bExports=require("./b")

console.log(bExports.foo);
console.log(bExports.add(10,30))
console.log(bExports.age)