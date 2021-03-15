const { readFileToArr } = require('../../util/File')
const Achievement = require('../../models/achievement')
const { updateStuAchieve } = require('./common')
const { TeacherPath } = require('../../data/path')
const qs = require('qs')

//辅导员登录
function Login(account, password) {
    return new Promise((resolve, reject) => {
        //读取文件中的账号密码
        readFileToArr(TeacherPath, (arr) => {
            //遍历文件每一行
            for (let i = 0, length = arr.length; i < length; i++) {
                let acc = arr[i].split(' ')[0]
                let pwd = arr[i].split(' ')[1]
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

//辅导员设计成果
function Desgin(params) {
    return new Promise((resolve, reject) => {
        //解构出参数
        const { name, level, attrs } = params
        if (!name || !level) {
            reject({
                status: 403,
                msg: '参数不齐！'
            })
        } else {
            //新的成果
            let newAchievement = new Achievement(global.$Achievement.length, name)

            //添加属性
            if (attrs) {
                let attributes = qs.parse(attrs)
                for (let i = 0; i < attributes.length; i++) {
                    newAchievement.addAttribute(attributes[i].name, attributes[i].value, attributes[i].required)
                }
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

//辅导员审核学生申请的成果
function Examine(stuNum, achievementId, newStatus) {
    return new Promise((resolve, reject) => {
        let result = updateStuAchieve(stuNum, achievementId, newStatus)
        if (result == false) {
            reject({
                status: 403,
                msg: '该生不存在或未申请此成果'
            })
        } else {
            resolve({
                status: 200,
                msg: '更新成功'
            })
        }
    })
}

//辅导员查看学生申请排名

//辅导员查看成果申请人数排名

module.exports = {
    Login,
    Desgin,
    Examine
}