## 第五天node.js学习笔记

### 一、package-lock.json和package.json

- npm5以前不会有package-lock.json文件,npm 5以后才加入了这个文件的
- 当你安装包的时候，npm都会生存或者更新package-lock.json这个文件
  - npm5以后的版本安装包不需要加`--save`参数，它会自动保存依耐信息
  - 当你安装包的时候，会自动创建或者更新`package-lock.json`
  - `package-lock.json`这个文件会保存`node_modules`中所有包的信息（版本、下载信息）
    - 这样的化重新`npm install`的时候速度可以提升
  - 从文件来看，有一个`lock`用来锁定版本
    - 如果项目依耐了1.1.1版本，如果你重新install其实会下载最新版本，而不是1.1.1
    - 我们的目的就是希望锁定1.1.1版本，所以这个package-lock.json这个文件锁定版本号，防止自动升级

### 二、MongoDB

#### 2.2关系数据库与非关系数据的区别

- 关系数据库就是表或表与表的关系
- 非关系数据库非常的灵活
- 有的非关系数据就是key-value对儿
- 但是MongoDB是长的最像关系型的非关系数据库
  - 数据库-》数据库
  - 数据表-》集合（数组）
  - 表记录-》(文档对象)
- mongeDB不需要设计表结构
- 也就是说你可以任意的往里面存数据，没有结构这么一说

#### 2.3安装

- 下载
  - 64位下载地址：http://dl.mongodb.org/dl/win32/x86_64
- 安装
- 配置环境变量
  - 找mongodb安装目录的bin目录下,配置该路径到环境变量
- 最后输入`mongod --version`测试是否安装成功

#### 2.4启动和关闭数据库

- 启动

  ~~~shell
  # mongodb 默认使用执行 mogod命令所处盘符根目录下/data/db作为自己的数据存储目录
  #所以在第一次执行该命令之前先手动新建一个/data/db
  mongod
  ~~~

  

- 如果想要修改默认的数据存储目录，可以：

- ~~~shell
  mogond --dbpath=数据存储目录路径
  ~~~

- 停止：

  ~~~shell
  在开启服务的控制台，直接Ctrl+C即可停止
  或者直接关闭开启的服务的控制台
  ~~~

#### 2.5连接和退出MongoDB数据库

连接：

~~~shell
#MongoDB安装目录的bin目录执行mongod,启动MongoDB服务
mongod
#配置环境变量后，任何地方输入mongo就连上MongoDB的数据库了，否则只能在MongoDB安装目录的bin目录下执行mongo才行
mongo
~~~

退出：

~~~shell
#在连接状态输入exit退出连接
exit
~~~

#### 2.6基本命令

​	**注意：**以下命令的前提是连接上数据库，输入`mongo`才可以执行

- `show dbs`

  - 查看显示所有数据库

- `db`

  - 查看当前操作的数据库

- `use 数据库名称`

  - 切换到指定的数据（若没有，则会自动新建）

- 插入数据

  ~~~shell
  db.集合.insertOne({对象})
  ~~~

#### 2.7在node中如何操作MongoDB数据

##### 2.7.1使用官方的`mongodb`包来操作

https://github.com/mongodb/node-mongodb-native

##### 2.7.2使用第三方mongoose来操作

第三包：`mongoose`基于Mongoose官方的`mongodb`包再做一次封装

官网：https://mongoosejs.com/

### 三、mongoose

#### 3.1MongeoDB数据库的基本概念

- 可以有多个数据库一个数据库有多个集合（表）

- 一个文档可以有多个文档（表记录）

- 文档结构很灵活，没有任何限制Mongodb非常灵活，不需要像mysql一样先创建库、表、设计表结构

  - 一切都由MongoDB来帮你自动完成建库建表这件事儿
  - 这儿只需要：当你需要插入数据的时候，只需要指定往哪个数据库的哪个集合操作就可以了

  ~~~js
  {
      qq(库): {
          user(集合，表): [
              {name:"张三",age:14}(对象，记录),
              {name:"李山",age:14},
              {name:"王五",age:14},
              {name:"张三123",age:14},
              ...
          ],
          products: [
  
          ]        
      },
      taobao: {
  
      },
      baidu: {
  
      }
  }
  ~~~

  

#### 3.2起步

- 安装

~~~shell
npm i mongoose	
~~~

- 确保**开启**MongoDB服务和**连接**MongoDB数据库

  ~~~shell
  #在bin目录下，输入mongod和mongo
  ~~~
  
- 示例：hello world

  ~~~js
  var mongoose = require('mongoose');
  
  // 连接 MongoDB 数据库，test默认连接的数据库，没有的会会自动创建
  mongoose.connect('mongodb://localhost/test', { useMongoClient: true });
  mongoose.Promise = global.Promise;
  
  // 创建一个模型
  // 就是在设计数据库
// MongoDB 是动态的，非常灵活，只需要在代码中设计你的数据库就可以了
  // mongoose 这个包就可以让你的设计编写过程变的非常的简单
var Cat = mongoose.model('Cat', { name: String });
  // 实例化一个 Cat
  var kitty = new Cat({ name: '喵喵' });
  // 持久化保存 kitty 实例
  kitty.save(function(err) {
      if (err) {
          console.log(err);
      } else {
          console.log('meow');
      }
  });
  ~~~
  
- 查看数据库的情况输入命令的过程

  ![1567413051490](.\img\1567413051490.png)

  

#### 3.3增删改查

官方指南：https://mongoosejs.com/docs/guide.html

- 保存

