const { readFileToArr } = require('../../util/File')
const { Sort } = require('../../util/Sort')
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
        const { name, level, attrs, studentAttr } = params
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
                for (let i = 0; i < Object.keys(attributes).length; i++) {
                    newAchievement.addAttribute(attributes[i].name, attributes[i].value)
                }
            }

            //添加学生属性
            if (studentAttr) {
                let stuAttribute = qs.parse(studentAttr)
                for (let i = 0; i < Object.keys(stuAttribute).length; i++) {
                    newAchievement.addStudentAttr(stuAttribute[i].name, stuAttribute[i].required)
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
function GetStudentRank() {
    return new Promise((resolve, reject) => {
        let result = []
        //得到所有学生学号
        let stuNumArray = global.$StudentAchieve.keys()

        //计算每个学号申请的成果个数
        for (let i = 0; i < stuNumArray.length; i++) {
            //学号
            let stuNum = stuNumArray[i]
            //该学号的所有申请成果
            let fieldSet = global.$StudentAchieve.fieldSet(stuNum)
            if (fieldSet == null) {
                var achievementNum = 0
            } else {
                var achievementNum = fieldSet.getAll().length
            }
            result.push({
                stuNum: stuNum,
                achievementNum: achievementNum
            })
        }

        result = Sort(result, 'achievementNum', -1)

        resolve({
            status: 200,
            data: result
        })
    })
}

//辅导员查看成果申请人数排名
function GetAchieveRank() {
    return new Promise((resolve, reject) => {
        let ids = []
        let allAchievement = global.$Achievement.getAll()
        //先得到所有学生的成果
        let allStudent = global.$StudentAchieve.keys()
        for (let i = 0; i < allStudent.length; i++) {
            //逐一得到学号
            let stuNum = allStudent[i]
            //得到此学生的所有成果
            let achievement = global.$StudentAchieve.fieldSet(stuNum)
            let id = achievement ? achievement.keys() : []
            //连接到id
            ids = [...ids, ...id]
        }
        //遍历所有成果,计算每个成果的申请人数
        for (let i = 0; i < allAchievement.length; i++) {
            allAchievement[i].number = 0
            for (let j = 0; j < ids.length; j++) {
                if (ids[j] == allAchievement[i].id) {
                    allAchievement[i].number++
                }
            }
        }

        //排序
        allAchievement = Sort(allAchievement, 'number', -1)

        resolve({
            status: 200,
            data: allAchievement
        })
    })
}

module.exports = {
    Login,
    Desgin,
    Examine,
    GetStudentRank,
    GetAchieveRank
}