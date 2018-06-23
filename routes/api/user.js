const router = require('express').Router()
const User = require('../../models/User')


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
                // TODO
                // 密码机密
                // 用户添加逻辑
            } else {
                res.json({ msg: '该邮箱已被注册！' })
            }
        })
})

module.exports = router