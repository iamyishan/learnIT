/**
 * app.js 入门模块
 * 职责：
 *   创建服务
 *   做一些服务相关配置
 *     模板引擎
 *     body-parser 解析表单 post 请求体
 *     提供静态资源服务
 *   挂载路由
 *   监听端口启动服务
 */

var express = require('express')
var router = require('./router.js')
var bodyParser = require('body-parser')

var app = express()
// 配置模板引擎，自动去views目录下面找
app.engine('html', require('express-art-template'));

//配置body-parser
// 只要加入这个配置，则req请求对象上会多出一个属性：body
//也就是说你就可以直接通过req.body来获取表单POST请求数据
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use('/public/', express.static('./public/'))
app.use('/node_modules/', express.static('./node_modules/'))
// parse application/json
app.use(bodyParser.json())

// 该方法是把router.js引入到app.js中，不是很方便
// require('./router.js')(app) 

// 把路由容器挂载到 app 服务中(更好的方式)
app.use(router)

app.listen(3000, function() {
    console.log("express running ........")
})