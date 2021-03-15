const path = require('path')
const fs = require('fs')
const { SplitArray } = require('../../util/Filter')
const Achievement = require('../../models/achievement')
const studentAchieve = require('../../models/studentAchieve')

//获取已设计的成果的列表
function getAchievementList() {
    return new Promise((resolve, reject) => {
        let result = global.$Achievement.getAll()
        resolve({
            status: 200,
            msg: '查询成功！',
            data: result
        })
    })
}

//从文件中读取辅导员设计的成果
function readAchievement() {
    //文本路径
    let pathName = path.join(__dirname + '/../../data/achievement.txt')

    //读取文件内容并以换行符分割
    let data = fs.readFileSync(pathName, 'utf-8').split('\n')

    //每个序列化的对象以' '隔开,得到对象数组
    let objArray = SplitArray(data, ' ')

    //序列化对象数组
    objArray.forEach(array => {
        //将每个对象挂载到全局global
        let obj = serializeAchieve(array)

    })
}

//从文件中读取学生的成果
function readStuAchieve() {
    //文本路径
    let pathName = path.join(__dirname + '/../../data/stuAchievement.txt')

    //读取文件内容并以换行符分割
    let data = fs.readFileSync(pathName, 'utf-8').split('\n')

    //每个序列化的对象以' '隔开,得到对象数组
    let objArray = SplitArray(data, ' ')

    //序列化对象数组
    objArray.forEach(array => {
        //将每个对象挂载到全局global
        let obj = serializeStuAchieve(array)

        console.log(obj)
    })
}


//Achievement数组反序列化为对象
function serializeAchieve(array) {
    let id = array[0]
    let name = array[1]

    let obj = new Achievement(id, name)
    obj.level = array[2]
    obj.createdAt = new Date(array[3])

    for (let i = 4; i < array.length; i++) {
        let attr = array[i].split(' ')
        obj.addAttribute(attr[0], attr[1], attr[2] == 'true' ? true : false)
    }

    return obj
}

//stuAchieve数组反序列化为对象
function serializeStuAchieve(array) {
    let stuNum = array[0]
    let achieveId = array[1]
    let status = array[2] == "审核通过" ? 1 : array[2] == 2 ? '审核不通过' : '未审核'

    let obj = new studentAchieve(stuNum, achieveId)
    obj.changeStatus(status)

    return obj
}

//更新学生成果审核状态
function updateStuAchieve(stuNum, achieveId) {

}



module.exports = {
    getAchievementList
}

readStuAchieve()