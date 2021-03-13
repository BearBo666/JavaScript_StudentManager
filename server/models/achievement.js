const { writeFile } = require('../util/File')
const pathName = 'C:/\Users/\PengYuYan/\Desktop/\学生成果管理系统/\server/\data/\achievement.txt'

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
        await writeFile(pathName, 'id:' + this.id)
        await writeFile(pathName, '成果名称:' + this.name)
        await writeFile(pathName, '级别:' + this.level)
        await writeFile(pathName, '录入时间:' + this.createdAt.toLocaleString())
        await writeFile(pathName, '属性:')
        for (let i = 0; i < this.attribute.length; i++) {
            await writeFile(pathName, this.attribute[i].name + ' ' + this.attribute[i].value + ' ' + this.attribute[i].required)
        }
        await writeFile(pathName, ' ')
    }
}


module.exports = Achievement