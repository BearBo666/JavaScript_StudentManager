const studentAchieve = require('../../models/studentAchieve')
//学生登录
function Login(account, password) {
    return new Promise((resolve, reject) => {
        //读取文件中的账号密码
        readLine('../../data/student.txt', (arr) => {
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

//学生申请成果
function Apply(account, achievementId) {
    return new Promise(async (resolve, reject) => {
        //检查是否存在此学号
        if (!await checkStuden(account)) {
            reject({
                status: 400,
                msg: '无此学号！'
            })
        } else {
            //检查是否存在
            if (!global.$Achievement.get(achievementId)) {
                reject({
                    status: 401,
                    msg: '无此成果！'
                })
            } else {
                //实例化一个学生成果对象
                const newStuAchieve = new studentAchieve(account, achievementId)

                //存入全局对象
                global.$StudentAchieve.insert(account, achievementId, newStuAchieve)

                //存入文件
                newStuAchieve.save()

                resolve({
                    status: 200,
                    msg: '录入成功,请等待审核！'
                })
            }
        }
    })
}

//学生查看自己的成果
function GetAchievementList(account) {
    return new Promise(async (resolve, reject) => {
        if (!await checkStuden(account)) {
            reject({
                status: 403,
                msg: '无此学号'
            })
        } else {
            
        }
    })
}

//检查是否文件中是否存在此学生
function checkStuden(account) {
    return new Promise((resolve, reject) => {
        readLine('../../data/student.txt', (arr) => {
            //遍历文件每一行
            for (let i = 0, length = arr.length; i < length; i++) {
                let acc = arr.split(' ')[0]
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
    Login
}