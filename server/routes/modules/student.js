const studentAchieve = require('../../models/studentAchieve')
const { readFileToArr } = require('../../util/File')
const { StudentPath } = require('../../data/path')
const qs = require('qs')

//学生登录
function Login(account, password) {
    return new Promise((resolve, reject) => {
        //读取文件中的账号密码
        readFileToArr(StudentPath, (arr) => {
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

//学生申请成果
function Apply(account, achievementId, attribute) {
    return new Promise(async (resolve, reject) => {
        //检查是否存在此学号
        if (!await checkStuden(account)) {
            reject({
                status: 400,
                msg: '无此学号！'
            })
        } else {
            //得到对应的成果对象
            const achievement = global.$Achievement.get(achievementId)
            //检查是否存在
            if (!achievement) {
                reject({
                    status: 401,
                    msg: '无此成果！'
                })
            } else {
                //检查该生是否申请过该成果
                let check = global.$StudentAchieve.get(account, achievementId)
                //如果没申请过
                if (!check) {
                    //实例化一个学生成果对象
                    const newStuAchieve = new studentAchieve(account, achievementId)

                    //获得学生要填的信息
                    const keys = Object.keys(achievement.studentAttr)
                    //获得学生提交的信息
                    const attr = qs.parse(attribute)

                    //检查信息是否提交全
                    for (let i = 0; i < keys.length; i++) {
                        //如果此属性必填并且前端没传
                        if (achievement.studentAttr[keys[i]] && !attr[keys[i]]) {
                            reject({
                                status: 403,
                                msg: '参数不全！'
                            })
                        }
                        //添加属性
                        newStuAchieve.addStudentAttr(keys[i], attr[keys[i]])
                    }

                    //存入全局对象
                    global.$StudentAchieve.insert(account, achievementId, newStuAchieve)

                    //存入文件
                    newStuAchieve.save()

                    resolve({
                        status: 200,
                        msg: '录入成功,请等待审核！'
                    })
                } else {
                    //如果申请过
                    resolve({
                        status: 201,
                        msg: '请勿重复申请'
                    })
                }
            }
        }
    })
}

//学生查看自己的成果
function GetOwnAchieve(account) {
    return new Promise(async (resolve, reject) => {
        if (!await checkStuden(account)) {
            reject({
                status: 403,
                msg: '无此学号'
            })
        } else {
            let fieldSet = global.$StudentAchieve.fieldSet(account)

            let result = []
            if (fieldSet) {
                result = fieldSet.getAll()
                for (let i = 0; i < result.length; i++) {
                    let achieveName = global.$Achievement.get(result[i].achieveId).name
                    result[i].achieveName = achieveName
                }
            }

            resolve({
                status: 200,
                data: result
            })
        }
    })
}

//检查是否文件中是否存在此学生
function checkStuden(account) {
    return new Promise((resolve, reject) => {
        readFileToArr(StudentPath, (arr) => {
            //遍历文件每一行
            for (let i = 0, length = arr.length; i < length; i++) {
                let acc = arr[i].split(' ')[0]
                if (acc != account) {
                    continue
                } else {
                    resolve(true)
                }
            }
            resolve(false)
        })
    })
}

module.exports = {
    Login,
    Apply,
    GetOwnAchieve
}
