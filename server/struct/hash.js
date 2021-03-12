//哈希表
class HashTable {
    //构造函数
    constructor(size) {
        //定义哈希表大小
        this.size = size == null ? 10 : size
        //数组存储
        this.storage = []
        //哈希表中元素个数
        this.length = 0
    }

    //计算散列密钥的方式
    myHashFunction(str, n) {
        let sum = 0
        for (let i = 0; i < str.length; i++) {
            sum += str.charCodeAt(i) * 3
        }
        return sum % n
    }

    //插入键值对
    insert(key, value) {
        //先计算得到此key的下标
        const index = this.myHashFunction(key, this.size)

        //拉链法处理冲突
        if (this.storage[index] == null) {
            this.storage[index] = []
        }
        //将新的键值对push进去
        this.storage[index].push([key, value])
        //长度加一
        this.length++
    }

    //根据key获得value
    get(key) {
        //先计算得到此key的下标
        const index = this.myHashFunction(key, this.size)

        //得到此下标存放的所有键值对
        let arrayAtIndex = this.storage[index]
        //得到键值对数组的长度
        const length = arrayAtIndex.length
        if (length != 0) {
            for (let i = 0; i < length; i++) {
                const pair = arrayAtIndex[i]
                if (pair[0] == key) {
                    return pair[1]
                }
            }
        } else {
            return null
        }
    }

    //删除某键值对
    remove(key) {
        //获得此key对应的下标
        const index = this.myHashFunction(key, this.storage)

        //得到此下标存放的所有键值对
        let arrayAtIndex = this.storage[index]
        //得到键值对数组的长度
        const length = arrayAtIndex.length
        if (length != 0) {
            for (let i = 0; i < length; i++) {
                const pair = arrayAtIndex[i]
                if (pair[0] == key) {
                    delete arrayAtIndex[i]
                    /*
                    有此元素并且删除成功则长度减一
                    并返回true
                    */
                    this.length--
                    return true
                }
            }
        } else {
            //没有这个元素则返回null
            return null
        }
    }
}

module.exports = HashTable