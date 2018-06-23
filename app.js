const express = require('express')
const app = express()
const mongoose = require('mongoose')
const keys = require('./config/keys')
const bodyParser = require('body-parser')
const user = require('./routes/api/user')
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


/**
 * 路由
 */

app.use('/api/user', user)




const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`程序在${port}端口启动...`)
})