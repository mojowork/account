const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const keys = require('./config/keys')
const bodyParser = require('body-parser')
// 引入路由
const user = require('./routes/api/user')
const profile = require('./routes/api/profile')
/**
 * 数据库连接
 */
mongoose.connect(keys.DBURI)
    .then(() => {
        console.log('数据库连接成功')
    })
    .catch(err => {
        console.log('数据库连接失败，失败原因=>' + err)
    })

/**
 * 中间件设置
 */
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(passport.initialize())
require('./config/passport')(passport)
// 使用中间件实现允许跨域
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Content-Type")
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS")
    next()
})

/**
 * 路由
 */
app.use('/api/user', user)
app.use('/api/profile', profile)




const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`程序在${port}端口启动...`)
})