## Node.js第一天

### 上午总结

- Node.js是什么
  - JavaScript运行时
  - 既不是语言，也不是框架，它是一个平台
- Node.js中JavaScript
  - 没有BOM、DOM
- EcmaScript基本的JavaScript语言部分
- 在Node中为JavaScript提供了一些服务器级别的API
  - 文件操作能力
  - http服务的能力

### 总结

- Node中的JavaScript

  - EcmaScript
    - 变量
    - 方法
    - 数据类型
    - 内置对象
    - Object
    - Array
    - Date
    - Math
  - 【重点】模块系统
    - 在Node中没有全局作用域的概念
    - 在Node中，只能通过require方法加载执行多个JavaScript脚本文件
    - require加载只能是执行其中的代码，文件与文件之间由于是模块作用域，所以不会有污染的
      - 模块完全是封闭的
      - 外部无法访问内部
      - 内部也无法访问外部
    - 模块作用域固然带来一些好处，可以加载执行多个文件，可以完全避免变量命名冲突污染的
    - 但是某些情况，模块与模块之间的通信的
    - 每个模块中，都提供一个对象：‘exports’
    - 该对象默认是一个空对象
    - 你要做的就是把需要外部访问使用的成员手动的挂载到“exports"接口对象
- 核心模块
    - 例如文件操作的fs核心模块，http服务构建的http模块，path路径操作模块、os操作系统信息模块
  - Content-Type
    - 服务器把每次响应的内容的数据告诉客户端，加上对应得编码方式
    - "Content-Type","text/plain;charset=utf-8"
  - 通过网络发送文件：fs+http结合使用
  - 做一个小系统：
    - CRUD
  - Express Web开发框架