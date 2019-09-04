/**
 * router.js 路由模块
 * 职责：
 *   处理路由
 *   根据不同的请求方法+请求路径设置具体的请求处理函数
 * 模块职责要单一，不要乱写
 * 我们划分模块的目的就是为了增强项目代码的可维护性
 * 提升开发效率
 */

// Express 提供了一种更好的方式
// 专门用来包装路由的
var express = require('express')
var Student = require('./student')
// var fs = require('fs')

// 1.创建一个路由容器
var router = express.Router()

// 2. 把路由都挂载到 router 路由容器中
/*
 * 渲染学生列表页面
 */
router.get('/students', function(req, res) {

// 调用find函数,并且定义回调函数作为参数，以便异步调用
    Student.find(function(err, students) {
        if (err) {
            return res.status(500).send('Server error.')
        }
        // 从文件中读取到的数据一定是字符串
        // 所以这里一定要手动转成对象,
        //  JSON.parse转换时，转化对象最好一定不要有逗号(,)
        res.render("index.html", {
            fruits: [
                '苹果',
                '香蕉',
                '橘子',
                '西瓜'
            ],
            students: students
        })
    })
})

/*
 * 渲染添加学生页面
 */
router.get('/students/new', function(req, res) {
    res.render('new.html')
})


/*
 * 处理添加学生
 */
router.post('/students/new', function(req, res) {
    // 1. 获取表单数据
    // 2. 处理
    //    将数据保存到 db.json 文件中用以持久化
    // 3. 发送响应
    Student.save(req.body, function(err) {

        if (err) {
            return res.status(500).send('Server error.')
        }
        res.redirect('/students')
    })
     console.log(req.body);
})

// 3. 把 router 导出
module.exports = router

// 这样也不方便
// module.exports = function (app) {
//   app.get('/students', function (req, res) {
//     // readFile 的第二个参数是可选的，传入 utf8 就是告诉它把读取到的文件直接按照 utf8 编码转成我们能认识的字符
//     // 除了这样来转换之外，也可以通过 data.toString() 的方式
//     fs.readFile('./db.json', 'utf8', function (err, data) {
//       if (err) {
//         return res.status(500).send('Server error.')
//       }

//       // 从文件中读取到的数据一定是字符串
//       // 所以这里一定要手动转成对象
//       var students = JSON.parse(data).students

//       res.render('index.html', {
//         fruits: [
//           '苹果',
//           '香蕉',
//           '橘子'
//         ],
//         students: students
//       })
//     })
//   })

//   app.get('/students/new', function (req, res) {

//   })

//   app.get('/students/new', function (req, res) {

//   })

//   app.get('/students/new', function (req, res) {

//   })

//   app.get('/students/new', function (req, res) {

//   })

//   app.get('/students/new', function (req, res) {

//   })
// }