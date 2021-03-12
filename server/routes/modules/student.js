
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
        if (!await checkStuden(account)) {
            reject({
                status: 403,
                msg: '无此学号！'
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