const express = require('express')
const router = express.Router()
const { Login, Apply, GetAchievementList } = require('./modules/student')

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
    const { account } = req.body
    GetAchievementList(account).then(result => {
        res.send(result)
    }).catch(err => {
        res.send(err)
    })
})

module.exports = router