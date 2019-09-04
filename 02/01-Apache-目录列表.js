var http = require('http')
var fs = require('fs')
var server = http.createServer()
var wwwDir = 'D:/ApacheTmp/www'
// Apache服务器软件的默认路径有一个www目录，所有放在www目录的文件访问
// 127.0.0.1:80/a.txt
// 127.0.0.1:80/index.html
// 127.0.0.1:80/apple/login.html
server.on('request', function(req, res) {
    var url = req.url
    // index.html
    // a.txt
    // apple/login.html
    var filePath = 'index.html'
    if (url !== '/') {
        filePath = url
    }
    console.log(filePath, wwwDir + filePath)
    fs.readFile(wwwDir + filePath, function(err, data) {
        if (err) {
            return res.end("404 Not Found")
        }
        res.end(data)
    })
})
server.listen(3000, function() {
    console.log('running...')
})