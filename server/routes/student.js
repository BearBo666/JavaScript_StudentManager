const express = require('express')
const router = express.Router()
const { Login } = require('./modules/student')

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
router.post('/', (req, res) => {
    //结构参数
    const { account } = req.headers
    const { achievementId } = req.body

})

module.exports = router