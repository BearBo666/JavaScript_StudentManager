const cors = require('cors')
const express = require('express');
const bodyParser = require('body-parser')

//引入数据解构
const Hash = require('./struct/hash')

var app = express()

//全局对象
global.$Achievement = new Hash(100)
global.$StudentAchieve = new Hash(100)

//解决跨域访问
app.use(cors())

//解析请求体
app.use(bodyParser.urlencoded({ extended: false }))

//引入路由
const TeacherRouter = require('./routes/teacher')

app.use('/teacher', TeacherRouter)

//监听端口
app.listen(8080, () => console.log("服务器启动成功,8080"))