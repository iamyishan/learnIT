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

