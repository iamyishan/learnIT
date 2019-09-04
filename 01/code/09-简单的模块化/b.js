// console.log("b.js文件被加载执行了")
console.log("b start")

var foo='bbb'

// console.log(add(2,3))
require('./c.js')
console.log('b end')