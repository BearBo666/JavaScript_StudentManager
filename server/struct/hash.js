//哈希
class Hash {
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
        for (let i = 0; i < key.length; i++) {
            sum += key.charCodeAt(i) * 3
        }
        return sum % n
    }

    //插入key-value 或 key-field-value
    insert(key, value) {
        //先计算得到此key的下标
        const index = this.myHashFunction(key, this.size)

        //拉链法处理冲突
        if (this.storage[index] == null) {
            this.storage[index] = []
        }
        //将新的key-value对push进去
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

        //判读是否存在key值的记录
        if (length != 0) {
            for (let i = 0; i < length; i++) {
                const pair = arrayAtIndex[i]
                //如果找到此key值
                if (pair[0] == key) {
                    return pair[1]
                }
            }
            //如果不存在此key的记录
            return null
        } else {
            //如果不存在key的记录
            return null
        }
    }

    //得到所有的value
    getAll() {
        let values = []

        //遍历storage存储
        for (let i = 0; i < this.size; i++) {
            //得到此下标的数组和长度
            const arrayAtIndex = this.storage[i]
            const length = arrayAtIndex ? arrayAtIndex.length : 0

            //判断此下标有没有记录key
            if (length == 0) {
                continue
            } else {
                //遍历此下标内所有的键值对
                for (let j = 0; j < length; j++) {
                    values.push(arrayAtIndex[j][1])
                }
            }
        }

        return values
    }


    //删除某键值对
    remove(key) {
        //获得此key对应的下标
        const index = this.myHashFunction(key, this.storage)

        //得到此下标存放的所有键值对
        let arrayAtIndex = this.storage[index]
        //得到键值对数组的长度
        const length = arrayAtIndex.length

        //判断是否有这个存储
        if (length != 0) {
            for (let i = 0; i < length; i++) {
                const pair = arrayAtIndex[i]
                //根据传入参数判断是删除key-value还是key-field-value
                if (pair[0] == key) {
                    delete arrayAtIndex[i]
                    //有此元素并且删除成功返回true
                    return true
                }
            }
        } else {
            //没有这个元素则返回null
            return null
        }
    }
}


module.exports = Hash