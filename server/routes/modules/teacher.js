const readLine = require('../../util/File')
const Achievement = require('../../models/achievement')

//登录
function Login(account, password) {
    return new Promise((resolve, reject) => {
        //读取文件中的账号密码
        readLine('../../data/teacher.txt', (arr) => {
            //遍历文件每一行
            for (let i = 0, length = arr.length; i < length; i++) {
                let acc = arr.split(' ')[0]
                let pwd = arr.split(' ')[1]
                if (acc != account) {
                    continue
                } else {
                    if (pwd == password) {
                        resolve({
                            status: 200,
                            msg: '成功登录！'
                        })
                    }
                }
            }
            //验证不通过
            reject({
                status: 400,
                msg: '验证不通过！'
            })
        })
    })
}

//设计成果
function Desgin(params) {
    return new Promise((resolve, reject) => {
        //解构出参数
        const { name, level, attributes } = params
        if (!name || !level) {
            reject({
                status: 403,
                msg: '参数不齐！'
            })
        } else {
            //新的成果
            let newAchievement = new Achievement(global.$Achievement.length, name)

            //添加属性
            for (let i = 0; i < attributes.length; i++) {
                newAchievement.addAttribute(attributes[i].name, attributes[i].value, attributes[i].required)
            }

            //存入文件
            newAchievement.save()

            //存入全局对象
            global.$Achievement.insert(newAchievement.id, newAchievement)

            //发往前端
            resolve({
                status: 200,
                msg: '添加成功！'
            })
        }
    })
}

module.exports = {
    Login,
    Desgin
}