# Node.js 第3天课堂笔记

### 知识点

- 增删改查
- 登陆
- 注册
- 头像
  - 服务端图片
  - 水印
  - 图片水印
- 找回密码
- 密码修改
- 模块系统
  - 核心模块
  - 第三方模块
  - 自己写的模块
  - 加载规则以及加载机制
  - 循环加载
- npm
- package.json
- Express
  - 第三方 Web 开发框架
  - 高度封装了 http 模块
  - 更加专注于业务，而非底层细节
  - 知其所以然
- 增删改查
  - 使用文件来保存数据（锻炼异步编码）
- MongoDB
  - （所有方法都封装好了）

### 一、网站开发

- 网站开发模型
  - 黑盒子、哑巴
  - 写代码让它变得更智能
  - 按照你设计好的套路供用户使用
- 在 Node 中使用 art-template 模板引擎
  - 安装
  - 加载
  - template.render()
- 客户端渲染和服务端渲染的区别
  - 最少两次请求，发起 ajax 在客户端使用模板引擎渲染
  - 客户端拿到的就是服务端已经渲染好的
- 处理留言本案例首页数据列表渲染展示
- 处理留言本案例发表留言功能
  - 路径
  - 设计好的请求路径
  - $GET 直接或查询字符串数据
  - Node 中需要咱们自己动手来解析
    - url.parse()
  - /pinglun?name=jack&message=hello
  - split('?')
  - name=jack&message=hello
  - split('&')
  - name=jack message=hello
  - forEach()
  - name=jack.split('=')
  - 0 key
  - 1 value
- 掌握如何解析请求路径中的查询字符串
  - url.parse()
- 如何在 Node 中实现服务器重定向
  - header('location')
    - **301 永久重定向** 浏览器会记住
      - a.com b.com
      - a 浏览器不会请求 a 了
      - 直接去跳到 b 了
    - 302 **临时重定向** 浏览器不记忆
      - a.com b.com
      - a.com 还会请求 a
      - a 告诉浏览器你往 b
- Node 中的 Console（REPL）使用

### 二、Node中的模块系统

- EcmaScript
  - 和浏览器不一样，在Node中没有BOM,DOM
- 核心模块
  - 文件操作的fs
  - http服务的http
  - url路径模块
  - path路径处理模块
  - os操作系统信息
- 第三方模块
  - art-tempale
  - 必须使用npm下载才可使用
- 咋们自己写的文件

#### 2.1什么是模块化

- 文件作用域
- 通信规则
  - 加载require
  - 导出

#### 2.2commonJS模块规范

在Node中的JavaScript还有一个很重要的概念，模块系统

- 模块作用域
- 使用require方法用来加载模块
- 使用exports接口对象用来导出模块中的成员

##### 2.2.1加载`require`

~~~javascript
var 自定义变量名称=require=('模块')
~~~

两个作用：

- 执行被加载模块中的代码
- 得到被加载模块中的exports导出接口的对象

##### 2.2.2导出`exports`

- node中是模块作用域，默认文件所有的成员只在当前模块有效

- 对于希望可以被其它模块访问的成员，我们需要把这些公开的成员都挂在`exports`接口对象中就可以了

  - 导出单个成员(必须在对象中)：

    ~~~javascript
    exports.a=123
    exports.b='hello'
    exports.c=function (){
        console.log('ccc')
    }
    ~~~

  - **导出单个成员**(拿到的就是：函数、字符串)

    ​	导出单个成员**必须**按下面方式写
    
    ~~~javascript
module.exports='hello'
    ~~~

    以下情况会覆盖前者：
    
    ~~~javascript
    module.exports='hello'
    module.exports=function(x,y){
    	return x+y
}
    ~~~

    也可以这样导出多个成员：
    
    ~~~javascript
    module.exports = {
        add:
        function(x, y) {
            return x + y
        },
        str: 'hello'
    }
    ~~~

#### 2.3模块系统原理

深入浅出 Node.js（三）：深入 Node.js 的模块机制：https://www.infoq.cn/article/nodejs-module-mechanism

- 每个模块中都有一个module对象
- module 对象中有一个 exports 对象
- 我们可以把需要导出的成员都挂载到 module.exports 接口对象中，也就是：`moudle.exports.xxx = xxx` 的方式
- 但是每次都 `moudle.exports.xxx = xxx` 很麻烦，点儿的太多了
- 所以 Node 为了你方便，同时在每一个模块中都提供了一个成员叫：`exports`
- exports === module.exports` 结果为  `true`s
- 所以对于：`moudle.exports.xxx = xxx` 的方式 完全可以：`expots.xxx = xxx`
- 当一个模块需要导出单个成员的时候，这个时候必须使用：`module.exports = xxx` 的方式
- 不要使用 `exports = xxx` 不管用，因为每个模块最终向外 `return` 的是 `module.exports`

- export和module.exports指向同一个引用：

  ~~~javascript
  console.log(exports===module.exports) //=>true
  exports.foo='bar'
  //等价于
  module.exports.foo='bar'
  ~~~
  

##### 2.3.1require方法加载规则

- 核心模块

  - 模块名

- 第三方模块

  - 模块名

- 用户自己写的

  - 路径

- **优先从缓存中加载**

- 判断module模块标识

  - 核心模块

    - require加载，不用带路径

  - 第三方模块

    - require加载，不用带路径

  - 自己写的模块

    - 带有路径形式的模块标识

      ~~~javascript
      var foo=require('./foo.js')
      //或者省略后缀.js
      var foo=require('./foo')
      ~~~

##### 2.3.2 模块查找机制

- 优先从缓存加载
- 核心模块
- 路径形式的文件模块
- 第三方模块
  - node_modules/art-template/
  - node_modules/art-template/package.json
  - node_modules/art-template/package.json main
  - index.js 备选项
  - 进入上一级目录找 node_modules
  - 按照这个规则依次往上找，直到磁盘根目录还找不到，最后报错：Can not find moudle xxx
  - 一个项目有且仅有一个 node_modules 而且是存放到项目的根目录

### 三、npm

- node package manager

- npm网站

  - npmjs.com

- npm命令工具

- npm的第二层含义就是一个命令行工具，只要你安装了node就已经安装了npm

- npm也有版本这个概念

- 可以通过命令行输入：

  ~~~shell
  npm --version
  ~~~

  升级npm(自己)：

  ~~~shell
  npm install --gloabl npm
  ~~~

#### 1.1 常用命令

​	网站：https://www.cnblogs.com/PeunZhang/p/5553574.html

- npm init
  - npm init -y可以跳过向导，快速生成`package.json`
- npm install
  - 一次性把dependencies 选项中的依赖项全部安装
  - npm i(简写install)
- npm install 包名
  - 只下载
  - npm i 包名（package.json中不会存储包名
- npm install --save 包名   或者  `npm install 包名 --save `
  - 下载并且依赖项（自动把包名存储到package.json文件中的dependencies）
  - npm i -S 包名
- npm uninstall 包名
  - 只删除，如果有依赖项会依然保存
  - npm un 包名
- npm uninstall --save 包名
  - 删除的同时也会把依赖信息去除
  - npm un  -S 包名
- npm help
  - 查看使用帮助
  - 例如我忘记了uninstall命令的简写了，这个时候，可以输入npm uninstall --help 查看使用帮助

#### 1.2解决npm被墙问题

npm存储文件的服务器在国外，下载很慢，选择**淘宝镜像**：

~~~http
https://npm.taobao.org/
~~~

- 使用方法

  - 安装cnpm

    ~~~shell
     # 在任意目录执行都可以
     # --global 表示安装到全局，而非当前目录
     # --global 不能省略，否则不管用
     npm install --global cnpm 
    ~~~

    接下来安装包的时候把之前的npm替换成cnpm

    举个例子

    ~~~shell
    npm install jquery # 走国外的服务器
    cnpm install jquery #走淘宝的服务器下载jQuery
    ~~~

    如果不想安装cnpm又想使用淘宝的服务器下载：

    ~~~shell
    npm install jquery --registry=https://registry.npm.taobao.org
    ~~~

    但是每次手动这样加参数很麻烦，所以我们可以把这个参数选项加入配置文件中：

    ~~~shell
    npm config set registry https://registry.npm.taobao.org
    # 查看npm 配置信息
    npm config list
    ~~~

    只要经过了上面命令的配置，则你以后所有的npm install都会默认通过淘宝服务器下载

### 四、package.json

建议每一个项目都要有一个**package.json**文件（包描述文件，就像产品说明说）

- 这个文件可以通过`npm init`的方式来自动初始化出来

  ~~~javascript
  F:\工作坚果云\计算机\学习笔记\3.node\03\code\npm-demo>npm init
  This utility will walk you through creating a package.json file.
  It only covers the most common items, and tries to guess sensible defaults.
  
  See `npm help json` for definitive documentation on these fields
  and exactly what they do.
  
  Use `npm install <pkg>` afterwards to install a package and
  save it as a dependency in the package.json file.
  
  Press ^C at any time to quit.
  package name: (npm-demo)
  version: (1.0.0) 0.0.1
  description: "这是一个测试项目"
  entry point: (index.js) main.js
  test command:
  git repository:
  keywords:
  author: yishan
  license: (ISC)
  About to write to F:\工作坚果云\计算机\学习笔记\3.node\03\code\npm-demo\package.json:
  
  {
    "name": "npm-demo",
    "version": "0.0.1",
    "description": "\"这是一个测试项目\"",
    "main": "main.js",
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
    },
    "author": "yishan",
    "license": "ISC"
  }
  ~~~

  对于开发人员来讲，最有用的是那个`dependencies`选项，可以帮助我们保存第三方包的依赖信息

  如果你的`node_module`删除了也不用担心，我们只需要：`nom install`就会自动把`package.json`中的dependencies中所有的依赖都下载回来

  - 建议每个项目的根目录下都有一个`package.json`文件
  - 建议执行`npm install`包名的时候都加上`--save`这个选项，目的是用来保存依赖项信息

### 五、express

原生的http在某些方面不足以应对我们的开发需求，所以我们就需要加快我们的开发效率，框架的目的就是提高效率，当我们的代码更高度统一。

 在Node中， 有很多Web开发框架，我们这里以学习express为主。









 