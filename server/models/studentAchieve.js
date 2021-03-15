const { writeFile } = require('../util/File')
const { StudentAchievePath } = require('../data/path')

//学生获得的成果
class studentAchieve {
    constructor(stuNum, achieveId) {
        //学号
        this.stuNum = stuNum
        //获得的成果的id的数组
        this.achieveId = achieveId
        //审核状态 0未审核  1审核通过  2审核不通过
        this.status = 0
    }

    //改变审核状态
    changeStatus(newStatus) {
        this.status = newStatus
    }

    //存入文件
    async save() {
        if (this.status == 0) {
            var statusTxt = '未审核'
        } else if (this.status == 1) {
            var statusTxt = '审核通过'
        } else if (this.status == 2) {
            var statusTxt = '审核不通过'
        } else {
            var statusTxt = '状态错误'
        }
        await writeFile(StudentAchievePath, this.stuNum)
        await writeFile(StudentAchievePath, this.achieveId)
        await writeFile(StudentAchievePath, statusTxt)
        await writeFile(StudentAchievePath, ' ')
    }
}

module.exports = studentAchieve