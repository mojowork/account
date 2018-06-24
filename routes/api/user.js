const bcrypt = require('bcrypt')
const passport = require('passport')
const router = require('express').Router()
const gravatar = require('gravatar') // 第三方头像库
const jwt = require('jsonwebtoken') // token
const User = require('../../models/User')
const keys = require('../../config/keys')


/**
 * $route GET /api/user/t
 * @desc token测试
 * @access private 
 */
router.get('/t', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({ msg: 'token测试成功' })
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
                    avatar,
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

/**
 * $route POST /api/user/login
 * @desc 用户登录
 * @access public 
 */
router.post('/login', (req, res) => {
    const email = req.body.email
    const password = req.body.password

    User.findOne({ email })
        .then(user => {
            if (!user) {
                res.status(404).json({ msg: '该用户不存在！' })
            } else {
                bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if (isMatch) {
                            // 生成token
                            const rule = {
                                id: user.id,
                                emial: user.emial,
                            }
                            jwt.sign(rule, keys.secret, { expiresIn: '1h' }, (err, token) => {
                                if (err) throw err
                                res.json({ msg: '登录成功', token: 'Bearer ' + token })
                            })
                        } else {
                            res.status(400).json({ msg: '用户密码错误' })
                        }
                    })
            }
        })

})

module.exports = router