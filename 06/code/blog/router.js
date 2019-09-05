var express = require('express')

var router = express.Router()

router.get('/', function(req, res) {
    // console.log(req.session.user)
    res.render('index.html')
})

router.get('/register', function(req, res) {
    res.render('register.html')
})

router.post('/register', async function(req, res) {
    var body = req.body
    console.log(body)
    try {
        if (await User.findOne({ email: body.email })) {
            return res.status(200).json({
                err_code: 1,
                message: '邮箱已存在'
            })
        }

        if (await User.findOne({ nickname: body.nickname })) {
            return res.status(200).json({
                err_code: 2,
                message: '昵称已存在'
            })
        }

        // 对密码进行 md5 重复加密
        body.password = md5(md5(body.password))

        // 创建用户，执行注册
        await new User(body).save()

        res.status(200).json({
            err_code: 0,
            message: 'OK'
        })
    } catch (err) {
        res.status(500).json({
            err_code: 500,
            message: err.message
        })
    }
})

module.exports = router