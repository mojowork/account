const router = require('express').Router()
const passport = require('passport')
const mongoose = require('mongoose')

const Profile = require('../../models/Profile')

/**
 * $route GET /api/profile/t
 * @desc profile测试
 * @access public 
 */
router.get('/t', /*passport.authenticate('jwt', { session: false }),*/ (req, res) => {
    res.json({
        msg: 'profile测试成功'
    })
})


/**
 * $route GET /api/profile
 * @desc 获取当前用户个人信息
 * @access private 
 */
router.get('/', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    Profile.findOne({
            user: req.user.id
        })
        .then(profile => {
            if (!profile) {
                return res.status(404).json({
                    msg: '该用户没有个人信息'
                })
            } else {
                res.json(profile)
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

/**
 * $route POST /api/profile
 * @desc 创建和编辑用户个人信息
 * @access private 
 */
router.post('/', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    Profile.findOne({
        user: req.user.id
    })
    .then(profile => {
        if (profile) {
            // 更新
        } else {
            // 创建
        }
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

module.exports = router