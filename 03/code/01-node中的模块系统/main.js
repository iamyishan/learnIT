
// var foo=require('./foo.js')
// foo is not defined
// console.log(foo)

// foo.js可省略后缀.js
var fooExorts=require('./foo')
console.log(fooExorts)


// 默认得到的是对象
// 使用对象中的成员必须 . 点儿某个成员来访问
// 有时候，对于一个模块，我仅仅就是希望导出一个方法就可以了