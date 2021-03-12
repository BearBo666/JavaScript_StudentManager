//队列
class Queue {
    //构造函数
    constructor() {
        //保存数据的对象
        this.queue = {}
        //保存长度
        this.length = 0
        //跟踪头部的新变量
        this.head = 0
    }
    //入队操作
    enqueue(value) {
        //以键值对存入对象
        this.queue[this.length + this.head] = value
    }
    //出队操作
    dequeue() {
        //获取队头元素的引用
        const firstVal = this.queue[this.head]
        //将队头元素删除
        delete this.queue[this.head]
        //长度减一
        this.length--
        //返回原队友元素
        return firstVal
    }
    //取队头元素值
    peek() {
        return this.queue[this.head]
    }
}

module.exports = Queue