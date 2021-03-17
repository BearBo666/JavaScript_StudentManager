const cors = require('cors')
const express = require('express');
const bodyParser = require('body-parser')

//引入数据解构
const Hash = require('./struct/hash')
const HashTable = require('./struct/hashTable')

var app = express()

const { readAchievement, readStuAchieve } = require('./routes/modules/common')

//全局对象
global.$Achievement = new Hash(100)
global.$StudentAchieve = new HashTable(100)

//解决跨域访问
app.use(cors())

//解析请求体
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

//引入路由
const TeacherRouter = require('./routes/teacher')
const StudentRouter = require('./routes/student')

//将路由作为中间件
app.use('/teacher', TeacherRouter)
app.use('/student', StudentRouter)

//监听端口
app.listen(8080, () => {
    console.log("服务器启动成功,监听端口:8080")
    //从文件中读取数据存到全局对象
    readStuAchieve()
    readAchievement()
})