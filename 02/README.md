

## 第二天 node笔记

### 一、代码分格

#### 1.1代码分号问题

- 无论你的代码是否有分号，都建议如果一行代码是以（、[、`最好都在开头加上分号;避免解析错误
- 在某些第三方代码中一上来就一个；开头
- 有些人喜欢玩花哨的东西，例如可以使用！~&等
- 无分号
  - `(`
  
  - `[`
  
  - `
  
  - 最好前面补分号，避免一些问题
  
    ~~~javascript
    ;(function(){
       //code 
    }()
    ~~~
  
  - 《编写可维护的 JavaScript》
  
  - 不仅是功能，还要写的漂亮

#### 1.2斜杠问题

- 文件路径与模块路径

  - 文件路径

    ~~~java
    // 在文件操作的相对路径中
    //    ./data/a.txt 相对于当前目录
    //    data/a.txt   相对于当前目录
    //    /data/a.txt  绝对路径，当前文件模块所处磁盘根目录,比如在C盘，则路径为C:data/a.txt
    //    c:/xx/xx...  绝对路径
     fs.readFile('./data/a.txt', function (err, data) {
      if (err) {
        console.log(err)
       return console.log('读取失败')
     }
    console.log(data.toString())
    })
    ~~~

  - 模块路径

    ~~~javascript
    // 这里如果忽略了 . 则也是磁盘根目录 比如在C盘，则路径为C:data/foo.js
    require('/data/foo.js') 
    
    //相对路径
    require('./data/foo.js')
    //模块加载的相对路径不能省略./
    //但文件加载路径可以省略./
    ~~~

    

### 二、服务端和客户端渲染区别

- 服务端渲染
- 就是在服务端使用模板引擎
  - 模板引擎最早诞生于服务端，后来才发展到前端
  - 服务端渲染
    - HTML代码和数据在`服务器端合并`之后，再发到浏览器中
    - 服务端渲染可以 被爬虫抓取到的，客户端异步渲染很难被爬虫抓取到
    - 经常是结合来做的
    - 例如京东的商品列表是服务端渲染，目的是为了SEO搜索引擎优化
    - 而它的商品评论列表是为了用户体验，不需要SEO 优化，所以是客户端渲染
  - ![1565688414827](F:\工作坚果云\计算机\学习笔记\3.node\02\img\45.png)
  - 客户端渲染
    - HTML代码在浏览器端，接受到服务器端的数据后，在`浏览器中合并二者`
    - 异步请求就是典型的客户端渲染
    - 客户端渲染不利于SEO搜索引擎优化
  - ![12](.\img\12.png)

### 三、原生node.js开发的小项目总结

#### 3.1如何通过服务器让客户端重定向？

1. 状态码设置为 302 临时重定向：statusCode
2. 在响应头中通过 Location 告诉客户端往哪儿重定向：setHeader

~~~javascript
res.statusCode = 302
      res.setHeader('Location', '/')
      res.end()
~~~

也就是说，如果客户端发现收到服务器的响应的状态码是 302 就会自动去响应头中找 Location ，然后对该地址发起新的请求所以你就能看到客户端自动跳转了

301 和 302 状态码区别

- 301 永久重定向，浏览器会记住
- 302 临时重定向

#### 3.2获取前端传递参数

- 引入url模块，采用url.parse方法

  -  使用 url.parse 方法将路径解析为一个方便操作的对象，第二个参数为 true 表示直接将查询字符串转为一个对象（通过 query 属性来访问）

    ~~~javascript
        var parseObj = url.parse(req.url, true)
    ~~~

  - 单独获取不包含查询字符串的路径部分（该路径不包含 ? 之后的内容）

    ~~~javascript
        // 单独获取不包含查询字符串的路径部分（该路径不包含 ? 之后的内容）
        var pathname = parseObj.pathname
    ~~~

### 四、模板引擎

#### 4.1安装

- npm install art-template
- 该命令在哪儿执行就会把包下载到哪儿，默认会下载到node_modules目录中
-  node_modules不要改，也不支持改
- art-template不仅可以在浏览器使用，也可以在node中使用

#### 4.2在node中使用art-template

~~~javascript
var template=require('art-template')
var ret=template.render(data.toString(),{
  		name:'Jack',
  		age:18,
  		province:'重庆市',
  		hobbies:['写代码','唱歌','打游戏'],
  		title:'个人信息'
  	})
~~~

#### 4.3在浏览器中使用art-template

~~~javascript
<script src="node_modules/art-template/lib/template-web.js"></script>
  <script type="text/template" id="tpl">
  	大家好，我叫：{{ name }}
  	我今年{{ age }}岁
  	我来自{{ province }}
  	我喜欢：{{each hobbies}} {{ $value }} {{/each}}
  </script>
  <script>
  	var ret=template('tpl',{
  		name:'Jack',
  		age:18,
  		province:'重庆市',
  		hobbies:['写代码','唱歌','打游戏']
  	})
  	console.log(ret)
  </script>
~~~

- 强调：模板引擎不关系你的字符串内容，只关心自己能认识的模板标记语法，例如{{}}语法被称之为mustache语法

### 五、 each 与forEach的区别

- jQuery 的 each 和 原生的 JavaScript 方法 forEach
  - EcmaScript 5 提供的

    - 不兼容 IE 8

  - jQuery 的 each 由 jQuery 这个第三方库提供

    - jQuery 2 以下的版本是兼容 IE 8 的

    - 它的 each 方法主要用来遍历 jQuery 实例对象（伪数组）

    - 同时它也可以作为低版本浏览器中 forEach 替代品

    - jQuery 的实例对象不能使用 forEach 方法，如果想要使用必须转为数组才可以使用

    - `[].slice.call(jQuery实例对象)`

      ~~~javascript
      Array.prototype.mySlice = function () {
        var start = 0
        var end = this.length
        if (arguments.length === 1) {
          start = arguments[0]
        } else if (arguments.length === 2) {
          start = arguments[0]
          end = arguments[1]
        }
        var tmp = []
        for (var i = start; i < end; i++) {
          // fakeArr[0]
          // fakeArr[1]
          // fakeArr[2]
          tmp.push(this[i])
        }
        return tmp
      }
      
      var fakeArr = {
        0: 'abc',
        1: 'efg',
        2: 'haha',
        length: 3
      }
      
      // 所以你就得到了真正的数组。 
      [].mySlice.call(fakeArr)
      ~~~

      

 