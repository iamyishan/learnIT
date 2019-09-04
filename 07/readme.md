### 1中间件

![img](.\img\38234340.jpg)

中间件的本质是就是一个请求处理方法，我们把用户从请求到响应的整个过程分发到多个中间件去处理，这样做的目的是提高代码的灵活性，动态可扩展的。

- 同一个请求的所经过的中间件都是同一个请求和响应对象

#### 1.1应用程序级别中间件

万能匹配(不关心请求路径)

~~~js
app.use(function(req,res,next){
    console.log('Time',Date.now())
    next()   
})
~~~

只要以`/xxx/`开头的

~~~js
app.use("/a",function(req,res,next){
    console.log('Time',Date.now())
})
~~~

#### 1.2路由级别中间件

get:

~~~js
app.get('/',function(req,res){
    res.send('Got a POST request')
})
~~~

post：

~~~js
app.post('/',function(req,res){
    res.send('Got a POST request')
})
~~~

put：

~~~js
app.put('/',function(req,res){
    res.send('Got a POST request')
})
~~~

#### 1.3错误处理中间件

全局统一处理错误

~~~js
app.use(function(err,req,res,next){
        console.error(err.stack)
    res.status(500).send("Something broke!")
})
~~~

#### 1.4内置带有功能的中间件

#### 1.5express的第三方中间件

网址：http://www.expressjs.com.cn/resources/middleware.html

- [body-parser](http://www.expressjs.com.cn/en/resources/middleware/body-parser.html)
- [compression](http://www.expressjs.com.cn/en/resources/middleware/compression.html)
- [connect-rid](http://www.expressjs.com.cn/en/resources/middleware/connect-rid.html)
- [cookie-parser](http://www.expressjs.com.cn/en/resources/middleware/cookie-parser.html)
- [cookie-session](http://www.expressjs.com.cn/en/resources/middleware/cookie-session.html)
- [cors](http://www.expressjs.com.cn/en/resources/middleware/cors.html)
- [csurf](http://www.expressjs.com.cn/en/resources/middleware/csurf.html)
- [errorhandler](http://www.expressjs.com.cn/en/resources/middleware/errorhandler.html)
- [method-override](http://www.expressjs.com.cn/en/resources/middleware/method-override.html)
- [morgan](http://www.expressjs.com.cn/en/resources/middleware/morgan.html)
- [multer](http://www.expressjs.com.cn/en/resources/middleware/multer.html)
- [response-time](http://www.expressjs.com.cn/en/resources/middleware/response-time.html)
- [serve-favicon](http://www.expressjs.com.cn/en/resources/middleware/serve-favicon.html)
- [serve-index](http://www.expressjs.com.cn/en/resources/middleware/serve-index.html)
- [serve-static](http://www.expressjs.com.cn/en/resources/middleware/serve-static.html)
- [session](http://www.expressjs.com.cn/en/resources/middleware/session.html)
- [timeout](http://www.expressjs.com.cn/en/resources/middleware/timeout.html)
- [vhost](http://www.expressjs.com.cn/en/resources/middleware/vhost.html)



- 分类
  - 
  - 关心路径
  - 除了以上中间件之外，还有一种最常用的严格匹配的请求方法，严格匹配请求方法和请求路径的中间件
    - app.get
    - app.post

- 中间件本身是一个方法，该方法接收三个参数：
     Request 请求对象
     Response 响应对象
     next     下一个中间件
- 执行顺序
  - 当请求进来，会从第一个中间件开始进行匹配
    - 如果匹配，则进来
            如果请求进入中间件之后，没有调用 next 则代码会 停在当前中间件
            如果调用了 next 则继续向后找到第一个匹配的中间件
    - 如果不匹配，则继续判断匹配下一个中间件
- 
- 模拟post请求的软件：postman