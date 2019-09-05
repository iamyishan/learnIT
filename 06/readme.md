第六天node.js笔记

### 一、path路径操作模块

官网:https://nodejs.org/dist/latest-v10.x/docs/api/path.html

- path.basename
  - 获取一个路径的文件名（默认包含扩展名）
- path.dirname
  - 获取一个路径中的目录部分
- path.extname
  - 获取一个路径中的后缀名
- path.parse
  - 把一个路径转为对象
    - root根对象
    - dir目录
    - base包含后缀名的文件名
    - ext后缀名
    - name不包含后缀的文件名
- path.join
  - 当你需要进行路径拼接的时候，推荐使用这个方法
- path.isAsolute判断一个路径是否绝对路径

### 二、Node中的其它成员

在每个模块中，除了`require`、`exports`等模块相关API之外，还有两个特殊的成员

- `__dirname`**动态获取**可以来获取当前文件模块所属目录的绝对路径
- __filename**动态获取**可以用来获取当前文件的绝对路径

### 三、文件路径和模块路径的差异

模块中的路径标识和文件操作中的相对路径标识**不一致**

1. 在文件操作中，使用相对路径是不可靠的，因为Node中文件操作的路径被设计为相对于执行**node命令所处的路径**（不是bug，人家说合计这样是有使用场景）。

   ~~~txt
      解决方法：所以为了解决这个问题，很简单，只需要把相对路径变为绝对路径,那这里我们就可以使用`__dirname`或者`__file`来帮助解决这个问题
   ~~~

2. 模块中的路径标识就是相对于当前文件模块，**不受执行 node 命令所处路径影响**。

### 四、在express配置使用`express-session`插件

|参考文档：|

安装：

~~~shell
npm install express-session
~~~

配置：

~~~shell
app.use(session({
  // 配置加密字符串，它会在原有加密基础之上和这个字符串拼起来去加密
  // 目的是为了增加安全性，防止客户端恶意伪造
  secret: 'itcast',
  resave: false,
  saveUninitialized: false // 无论你是否使用 Session ，我都默认直接给你分配一把钥匙
}))
~~~

使用：

~~~shell
#添加session数据
req.session.foo='bar'
#获取session数据
req.session.foo
~~~

提示：默认session数据是内存存储的，服务器一旦重启就会丢失，真正的生产环境会把session进行持久化存储。









