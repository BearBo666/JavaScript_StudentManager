const express = require('express')
const router = express.Router()
const { Login, Apply, GetOwnAchieve } = require('./modules/student')
const { getAchievementList } = require('./modules/common')

//学生登录
router.post('/login', (req, res) => {
    const { account, password } = req.body
    Login(account, password).then(result => {
        res.send(result)
    }).catch(err => {
        res.send(err)
    })
})

//学生申请成果
router.post('/apply', (req, res) => {
    //结构参数
    const { account, achievementId } = req.body
    Apply(account, achievementId).then(result => {
        res.send(result)
    }).catch(err => {
        res.send(err)
    })
})

//学生查看自己申请的成果
router.get('/list', (req, res) => {
    const { account } = req.query
    GetOwnAchieve(account).then(result => {
        res.send(result)
    }).catch(err => {
        res.send(err)
    })
})

//学生查看可申请的成果
router.get('/index', (req, res) => {
    let result = getAchievementList()
    res.send({
        status: 200,
        data: result
    })
})

module.exports = router