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
        //成果级别,0未确定,1国家级,2省级..
        this.level = 0
        //录入时间
        this.createdAt = new Date()
    }

    //添加属性
    addAttribute(name, value, required) {
        //压入数组
        this.attribute.push({ name: name, value: value, required: required })
    }

    //将成果存入文本
    async save() {
        await writeFile(AchievePath, this.id)
        await writeFile(AchievePath, this.name)
        await writeFile(AchievePath, this.level)
        await writeFile(AchievePath, this.createdAt)
        for (let i = 0; i < this.attribute.length; i++) {
            await writeFile(AchievePath, this.attribute[i].name + ' ' + this.attribute[i].value + ' ' + this.attribute[i].required)
        }
        await writeFile(AchievePath, ' ')
    }
}


module.exports = Achievement