//学生获得的成果
class stuGaining {
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
}