const { StudentAchievePath, AchievePath } = require('../../data/path')
const { SplitArray } = require('../../util/Filter')
const Achievement = require('../../models/achievement')
const studentAchieve = require('../../models/studentAchieve')
const fs = require('fs')

//获取已设计的成果的列表
function getAchievementList() {
    return global.$Achievement.getAll()
}

//从文件中读取辅导员设计的成果
function readAchievement() {
    //读取文件内容并以换行符分割
    let data = fs.readFileSync(AchievePath, 'utf-8').split('\n')

    //每个序列化的对象以' '隔开,得到对象数组
    let objArray = SplitArray(data, ' ')

    //序列化对象数组
    objArray.forEach(array => {
        //将每个对象挂载到全局global
        let obj = serializeAchieve(array)
        global.$Achievement.insert(obj.id, obj)
    })
}

//从文件中读取学生的成果
function readStuAchieve() {
    //读取文件内容并以换行符分割
    let data = fs.readFileSync(StudentAchievePath, 'utf-8').split('\n')

    //每个序列化的对象以' '隔开,得到对象数组
    let objArray = SplitArray(data, ' ')

    //序列化对象数组
    objArray.forEach(array => {
        //将每个对象挂载到全局global
        let obj = serializeStuAchieve(array)
        global.$StudentAchieve.insert(obj.stuNum, obj.achieveId, obj)
    })
}


//Achievement数组反序列化为对象
function serializeAchieve(array) {
    //从数组中得到数据
    let id = array[0]
    let name = array[1]

    //生成对象
    let obj = new Achievement(id, name)
    obj.level = array[2]
    obj.createdAt = new Date(array[3])

    //给成果对象添加属性
    for (let i = 4; i < array.length; i++) {
        let attr = array[i].split(' ')
        obj.addAttribute(attr[0], attr[1], attr[2] == 'true' ? true : false)
    }

    return obj
}

//stuAchieve数组反序列化为对象
function serializeStuAchieve(array) {
    //从数组中得到数据
    let stuNum = array[0]
    let achieveId = array[1]
    let status = array[2] == "审核通过" ? 1 : array[2] == 2 ? '审核不通过' : '未审核'

    //生成对象
    let obj = new studentAchieve(stuNum, achieveId)
    obj.changeStatus(status)

    return obj
}



//更新学生成果审核状态
function updateStuAchieve(stuNum, achieveId, newStatus) {
    //先得到该学生的成果实例
    let studentAchieve = global.$StudentAchieve.get(stuNum, achieveId)

    //如果不存在
    if (!studentAchieve) {
        return false
    } else {
        studentAchieve.changeStatus(newStatus)

        global.$StudentAchieve.update(stuNum, achieveId, studentAchieve)

        //清空文件
        fs.writeFileSync(StudentAchievePath, '')

        //更新文件内容
        saveStudentAchieve()

        return true
    }
}

//将global对象保存的数据存入文件
function saveStudentAchieve() {
    //得到所有学号
    let allStudent = global.$StudentAchieve.keys()

    //遍历每个学生的成果
    for (let i = 0; i < allStudent.length; i++) {
        let stuNum = allStudent[i]

        //得到该学生的所有成果
        let stuAchievement = global.$StudentAchieve.fieldSet(stuNum).getAll()

        //将每一个成果对象存入文件
        for (let j = 0; j < stuAchievement.length; j++) {
            stuAchievement[j].save()
        }
    }
}


module.exports = {
    getAchievementList,
    readAchievement,
    readStuAchieve,
    updateStuAchieve,
}
