const { writeFile } = require('../util/File')
const { StudentAchievePath } = require('../data/path')

//学生获得的成果
class studentAchieve {
    constructor(stuNum, achieveId) {
        //学号
        this.stuNum = stuNum
        //获得的成果的id的数组
        this.achieveId = achieveId
        //对应录入的成果属性
        this.studentAttr = []
        //审核状态 0未审核  1审核通过  2审核不通过
        this.status = 0
    }

    //改变审核状态
    changeStatus(newStatus) {
        this.status = newStatus
    }

    //添加学生属性
    addStudentAttr(name, value) {
        this.studentAttr.push({ name, value })
    }

    //存入文件
    save() {
        var statusTxt = ''
        switch (this.status) {
            case '0':
                statusTxt = '未审核';
                break;
            case '1':
                statusTxt = '审核通过';
                break;
            case '2':
                statusTxt = '审核不通过';
                break;
            default:
                statusTxt = '状态出错';
                break;
        }
        var text = this.stuNum + '\n' + this.achieveId + '\n' + statusTxt + '\n'
        for (let i = 0; i < this.studentAttr.length; i++) {
            text += this.studentAttr[i].name + ' ' + this.studentAttr[i].value + '\n'
        }
        text += ' '
        writeFile(StudentAchievePath, text)
    }
}

module.exports = studentAchieve