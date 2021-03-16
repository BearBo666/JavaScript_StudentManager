const { writeFile } = require('../util/File')
const { AchievePath } = require('../data/path')

//辅导员设计的成果
class Achievement {
    //构造函数
    constructor(id, name) {
        //成果的id,主键
        this.id = id
        //成果的名称
        this.name = name
        //成果包含的属性
        this.attribute = []
        //要求学生填写的属性
        this.studentAttr = {}
        //成果级别,0未确定,1国家级,2省级..
        this.level = 0
        //录入时间
        this.createdAt = new Date()
    }

    //添加属性
    addAttribute(name, value) {
        //压入数组
        this.attribute.push({ name: name, value: value })
    }

    //添加学生属性
    addStudentAttr(name, required) {
        this.studentAttr[name] = required
    }

    //获得学生属性
    getStudentAttr() {
        return this.studentAttr
    }

    //将成果存入文本
    save() {
        writeFile(AchievePath, this.id)
        writeFile(AchievePath, this.name)
        writeFile(AchievePath, this.level)
        writeFile(AchievePath, this.createdAt)
        for (let i = 0; i < this.attribute.length; i++) {
            writeFile(AchievePath, this.attribute[i].name + ' ' + this.attribute[i].value)
        }
        writeFile(AchievePath, ' ')
    }
}


module.exports = Achievement