## 第四天 Node.js笔记

#### 第72集和73集还没看

**注意区分**：浏览器输入的地址请求是GET,而POST 通过表单提交

### 修改代码自动重启

使用第三方命名工具：`nodemon`来帮助我们**解决频繁修改代码重启服务器**

`nodemon`是一个基于Node.js开发的一个第三方命令工具，使用时需要独立安装：

~~~shell
#只要时--global，在任何文件执行都可以
npm install --global nodemon
~~~

安装完毕后，使用：

~~~shell
node app.js
#使用 nodemon
nodemon app.js
~~~

只要是通过启动的服务，则它会监视你文件变化，当文件发生变化的时候，自动帮你重启服务器

### 一、Express

[Express官网](http://www.expressjs.com.cn/)

#### 1.1起步

##### 1.1.1安装：

~~~shell
npm install --save express
~~~

##### 1.1.2hello world:

~~~javascript
var express = require('express')
// 1.创建
var app = express()
app.get('', function(req, res) {
    // res.end('hello world')   原生的仍可用
    res.send('hello world 1')
})
app.listen(3000, function() {
    console.log('express app is running...')
})
~~~

##### 1.1.3基本路由

路由

- 请求方法
- 请求路径
- 请求处理函数

get:

~~~javascript
//当你以GET方法请求/的时候，执行对应的处理函数
app.get('/login', function(req, res) {
    res.send('hello login')
})
~~~

post:

~~~javascript
//当你以POST方法请求/的时候，指定对应的处理函数
app.post('/', function(req, res) {
    res.send('hello post')
})
~~~

1.1.4静态服务

~~~javascript
// /public资源
app.use(express.static('public'))
// /files资源
app.use(express,static('files'))
// /public/xxx
app.use('/public',express.static('public'))
// /static/xxx
app.use('/static',express.static('public'))

app.use('/static',express.static(path.join(_dirname,'public')))
~~~

#### 1.2在express中配置`art-template`模板引擎

-  [art-template github厂库](https://github.com/aui/art-template)
- [art-template官网](https://aui.github.io/art-template/)

- 安装

  ~~~shell
  npm install --save art-template
  npm install --save express-art-template
  ~~~

- 配置

  ~~~javascript
  第一个参数，表示当渲染以 .html 结尾的文件的时候，使用 art-template 模板引擎
  app.engine('html', require('express-art-template'));
  ~~~

- 使用

  ~~~javascript
  app.get('/admin',function(req,res){
      // express默认会去项目中的views目录找index.html
  	res.render('./admin/index.html',{
          file:'管理系统'}
                 )
  ~~~

  如果希望修改默认的`views`视图渲染存储目录，可以：

  ~~~javascript
  // 注意：第一个参数views千万不要写错
  app.set('views',目录路径)
  ~~~

#### 1.3在express中获取表单GET请求参数

Express内置了一个API,可以直接通过req.query来获取

~~~javascript
req.query
~~~



#### 1.4在Express获取表单POST请求数据

在Express中没有内置获取表单POST请求体的API，这里我们需要使用一个第三方包：body-parser

- 安装：

- ~~~shell
  npm install --save body-parser
  ~~~

- 配置

  ~~~javascript
  var express = require('express')
  // 0.引包
  var bodyParser = require('body-parser')
  
  var app = express()
  
  //配置body-parser
  // 只要加入这个配置，则req请求对象上会多出一个属性：body
  //也就是说你就可以直接通过req.body来获取表单POST请求数据
  app.use(bodyParser.urlencoded({ extended: false }))
  // parse application/json
  app.use(bodyParser.json())
  
  //可以通过req.body获取表单数据
  app.use(function (req, res) {
    res.setHeader('Content-Type', 'text/plain')
    res.write('you posted:\n')
    res.end(JSON.stringify(req.body, null, 2))
  ~~~

  

#### 1.5回调函数原理

- 把函数定义赋给callback,后面在函数体中执行回调callback
- 先定义，后调用
- 可以把异步的请求内容拿出来，也就是把异步内的变量拿到函数外部来

![23](.\img\23.png)

