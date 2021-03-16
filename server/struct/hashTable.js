const Hash = require('./hash')

//哈希表
class hashTable {
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
    myHashFunction(key, n) {
        let sum = 0
        let length = key ? key.length : 0
        for (let i = 0; i < length; i++) {
            sum += key.charCodeAt(i) * 3
        }
        return sum % n
    }

    //插入key-field-value
    insert(key, field, value) {
        //先计算得到此key的下标
        const index = this.myHashFunction(key, this.size)

        /*
        拉链法处理冲突
        如果该下标处没有数组，则代表没有此key记录
        */
        if (this.storage[index] == null) {
            this.storage[index] = []

            //将field-value生成键值对
            let x = new Hash(100)
            x.insert(field, value)

            //将新的key-value对push进去
            this.storage[index].push([key, x])
            //长度加一
            this.length++
        } else {
            //遍历查看有没有该key
            let flag = false
            for (let i = 0; i < this.storage[index].length; i++) {
                const pair = this.storage[index][i]
                if (pair[0] == key) {
                    //改变找到标置
                    flag = true
                    //插入field-value对
                    pair[1].insert(field, value)
                    //终止循环
                    break;
                }
            }
            //如果不存在此key的记录
            if (!flag) {
                //将field-value生成键值对
                let x = new Hash(100)
                x.insert(field, value)

                //将新的key-value对push进去
                this.storage[index].push([key, x])
                //长度加一
                this.length++
            }
        }
    }

    //根据key,field取得value
    get(key, field) {
        //先计算得到此key的下标
        const index = this.myHashFunction(key, this.size)

        //得到此下标存放的所有key
        const arrayAtIndex = this.storage[index]
        const length = arrayAtIndex ? arrayAtIndex.length : 0

        //如果有key的记录
        if (length != 0) {
            for (let i = 0; i < length; i++) {
                const pair = arrayAtIndex[i]
                if (pair[0] == key) {
                    return pair[1].get(field)
                }
            }
            return null
        } else {
            //没有记录key则返回null
            return null
        }
    }

    //得到所有的key
    keys() {
        let keys = []

        //遍历哈希表的存储数组
        for (let i = 0; i < this.size; i++) {
            let arrayAtIndex = this.storage[i]
            let length = arrayAtIndex ? arrayAtIndex.length : 0

            if (length != 0) {
                //遍历此下标的所有键值对
                for (let j = 0; j < length; j++) {
                    keys.push(arrayAtIndex[j][0])
                }
            }
        }

        return keys
    }

    //得到某个key的所有field-value对
    fieldSet(key) {
        //先计算得到此key的下标
        const index = this.myHashFunction(key, this.size)

        //得到此下标存放的所有key
        const arrayAtIndex = this.storage[index]
        const length = arrayAtIndex ? arrayAtIndex.length : 0

        //判断是否有key的记录
        if (length != 0) {
            for (let i = 0; i < length; i++) {
                const pair = arrayAtIndex[i]
                if (pair[0] == key) {
                    return pair[1]
                }
            }
            return null
        } else {
            return null
        }
    }

    //更新状态
    update(key, field, newValue) {
        //先计算得到此key的下标
        const index = this.myHashFunction(key, this.size)

        //得到此下标存放的所有key
        const arrayAtIndex = this.storage[index]
        const length = arrayAtIndex ? arrayAtIndex.length : 0

        //判断此下标有没有存放key
        if (length != 0) {
            for (let i = 0; i < length; i++) {
                let pair = arrayAtIndex[i]
                if (pair[0] == key) {
                    //更新这个key的hash
                    let status = arrayAtIndex[i][1].update(field, newValue)
                    return status
                }
            }
            return false
        } else {
            return false
        }
    }
}


module.exports = hashTable