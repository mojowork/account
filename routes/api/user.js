const bcrypt = require('bcrypt')
const router = require('express').Router()
const gravatar = require('gravatar') // 第三方头像库
const User = require('../../models/User')
const keys = require('../../config/keys')


/**
 * $route GET /api/user/t
 * @desc 测试路由
 * @access public 
 */
router.get('/t', (req, res) => {
    res.json({ msg: 't 意味着 test' })
})

/**
 * $route POST /api/user/register
 * @desc 用户注册
 * @access public 
 */
router.post('/register', (req, res) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                // 生成头像
                var avatar = gravatar.url(req.body.email, { s: '200', r: 'pg', d: 'mm' })
                // TODO
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar: avatar,
                    password: req.body.password
                })
                // 密码加密
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err
                        newUser.password = hash
                        // 用户添加逻辑
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err))
                    })
                })

            } else {
                res.status(400).json({ msg: '该邮箱已被注册！' })
            }
        })
})

module.exports = router