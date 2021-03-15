const express = require('express')
const router = express.Router()
const qs = require('qs')
const { Login, Desgin, Examine } = require('./modules/teacher')

//辅导员登录
router.post('/login', (req, res) => {
    //解构出参数
    const { account, password } = req.body
    Login(account, password).then(result => {
        res.send(result)
    }).catch(err => {
        res.send(err)
    })
})

//辅导员设计成果
router.post('/desgin', (req, res) => {
    //解构出参数
    const { name, level, attrs } = req.body
    //属性序列化
    const { attributes } = qs.parse(attrs)
    Desgin({ attributes, name, level }).then(result => {
        res.send(result)
    }).catch(err => {
        res.send(err)
    })
})

//辅导员审核学生成果
router.post('/examine', (req, res) => {
    const { stuNum, achievementId, newStatus } = req.body
    Examine(stuNum, achievementId, newStatus).then(result => {
        res.send(result)
    }).catch(err => {
        res.send(err)
    })
})

module.exports = router