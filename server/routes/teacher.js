const express = require('express')
const router = express.Router()
const { Login, Desgin, Examine, GetUnexamined, GetStudentRank, GetAchieveRank } = require('./modules/teacher')

//辅导员登录
router.post('/login', (req, res) => {
    const { account, password } = req.body
    Login(account, password).then(result => {
        res.send(result)
    }).catch(err => {
        res.send(err)
    })
})

//辅导员设计成果
router.post('/desgin', (req, res) => {
    const { name, level, attrs, studentAttr } = req.body
    Desgin({ attrs, name, level, studentAttr }).then(result => {
        res.send(result)
    }).catch(err => {
        res.send(err)
    })
})

//辅导员获得未审核的学生成果申请
router.get('/list', (req, res) => {
    GetUnexamined().then(result => {
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

//辅导员获得学生排名
router.get('/stuRank', (req, res) => {
    GetStudentRank().then(result => {
        res.send(result)
    }).catch(err => {
        res.send(err)
    })
})

//辅导员获得成果排名
router.get('/achRank', (req, res) => {
    GetAchieveRank().then(result => {
        res.send(result)
    }).catch(err => {
        res.send(err)
    })
})

module.exports = router