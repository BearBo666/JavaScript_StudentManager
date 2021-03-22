# 一.课设题目及设计要点

## 1.1 题目

**【题目2】大学生课外科技活动成果管理系统**

大学生课外科技活动包括但不限于科研成果、知识产权、科研训练、学科与科技竞赛、技能证书、创业实践和创新创业教育等。其中：

科研成果：包括学生获得的国家级、省级科技成果奖，在公开出版的学术期刊上发表的论文以及被省级以上学术会议收录的论文，在报刊、杂志上发表作品等；

知识产权：指获得专利、软件著作权等；

学科与科技竞赛：指由政府部门或行业权威机构组织的学科与科技竞赛，以及由学校组织的各类学科与科技竞赛；

技能证书：指经职业技能考核获得的各类资格证书，例如计算机技术与软件专业技术资格（水平）证书。

……

系统功能包括：

1、由辅导员将各项成果属性录入系统，例如论文包括：论文名称、作者、排序、刊物名称、发表年月、收录情况、学分值等等，自行设计。竞赛包括：竞赛名称、级别、获奖、时间、学分值等等，自行设计。

2、学生根据各类成果管理要求，录入自己的成果。

3、辅导员审核、查看、统计成果排名。

4、其他功能自行设计。

5、数据保存在文件中，不得使用数据库管理系统。



<br>



## 1.2 设计要点

本项目主要是一个web服务，前后端都是基本JavaScript语言，并通过http协议通信。

大致涉及到的技术点有：

1. 前后端分离
2. 文件存取
3. 队列
4. 哈希表查找
5. 快速排序
6. ......



<br>



## 1.3 设计语言及工具

1. 前端：Vue.js    2.6.11
2. 后端：JavaScript的运行时Nodejs    14.5.0
3. UI库：Element UI
4. 编辑器：vscode
5. 工具：git



<br>



## 1.4 源代码

github地址：https://github.com/BearBo666/JavaScript_StudentManager



<br>



# 二.功能列表

## 2.1 辅导员功能

### 2.1.1 登录

```
辅导员账号密码存放在文件中,当前端传递与文件中相同的账号密码时才允许登录。
```

![image-20210318133440957](https://raw.githubusercontent.com/BearBo666/PicGo/master/img/20210318133441.png)



![image-20210318125615536](https://raw.githubusercontent.com/BearBo666/PicGo/master/img/20210318125615.png)



![image-20210318130652348](https://raw.githubusercontent.com/BearBo666/PicGo/master/img/20210318130652.png)



![image-20210318125815390](https://raw.githubusercontent.com/BearBo666/PicGo/master/img/20210318125815.png)



### 2.1.2 设计成果

```
一个成果分为静态成果与动态成果,如下图,静态属性不需要学生填写,动态属性需要学生进行填写。
```



![属性](https://raw.githubusercontent.com/BearBo666/PicGo/master/img/20210318125505.jpg)



![image-20210318125908128](https://raw.githubusercontent.com/BearBo666/PicGo/master/img/20210318125908.png)



![image-20210318125949822](https://raw.githubusercontent.com/BearBo666/PicGo/master/img/20210318125949.png)



![image-20210318130036199](https://raw.githubusercontent.com/BearBo666/PicGo/master/img/20210318130036.png)



![image-20210318130056297](https://raw.githubusercontent.com/BearBo666/PicGo/master/img/20210318130056.png)



![image-20210318130142817](https://raw.githubusercontent.com/BearBo666/PicGo/master/img/20210318130142.png)



![image-20210318133718728](https://raw.githubusercontent.com/BearBo666/PicGo/master/img/20210318133718.png)



### 2.1.3 获得待审核的学生成果

```
先获得所有学生的学号,然后基于哈希表查找技术从中筛选出未审核的学生申请。
```

![image-20210318135932090](https://raw.githubusercontent.com/BearBo666/PicGo/master/img/20210318135932.png)



![image-20210318140011570](https://raw.githubusercontent.com/BearBo666/PicGo/master/img/20210318140011.png)



### 2.1.4 审核学生申请的成果

```
学生申请的成果有三种状态:‘未审核’,‘审核通过’,‘审核不通过’。

审核后会更新文件内的内容。
```

![image-20210318140100573](https://raw.githubusercontent.com/BearBo666/PicGo/master/img/20210318140100.png)



![image-20210318140115686](https://raw.githubusercontent.com/BearBo666/PicGo/master/img/20210318140115.png)



### 2.1.5 获得学生排名

```
先获得所有学生的申请成果数,然后运用快速排序对它们进行排序。
```

![image-20210318183541005](https://raw.githubusercontent.com/BearBo666/PicGo/master/img/20210318183541.png)



### 2.1.6 获得成果排名

```
先获得所有成果的申请人数,然后后端运用快速排序根据申请人数对它们进行排序。
```

![image-20210318183551063](https://raw.githubusercontent.com/BearBo666/PicGo/master/img/20210318183551.png)



![image-20210318183617417](https://raw.githubusercontent.com/BearBo666/PicGo/master/img/20210318183617.png)



<br>



## 2.2 学生功能

### 2.2.1 登录

```
学生账号密码存放在文件中,当前端传递与文件中相同的账号密码时才允许登录
```

**![image-20210318135554871](https://raw.githubusercontent.com/BearBo666/PicGo/master/img/20210318135554.png)**

![image-20210318130343198](https://raw.githubusercontent.com/BearBo666/PicGo/master/img/20210318130343.png)



### 2.2.2 查看所有成果

```
将所有辅导员设计的成果发送给前端渲染。
```

![image-20210318135447266](https://raw.githubusercontent.com/BearBo666/PicGo/master/img/20210318135447.png)



### 2.2.3 申请成果

```
学生在前端需正确填写想申请的成果的所有必填项才能成果递交申请给老师。
```



![image-20210318130435180](https://raw.githubusercontent.com/BearBo666/PicGo/master/img/20210318130435.png)



![image-20210318130445754](https://raw.githubusercontent.com/BearBo666/PicGo/master/img/20210318130445.png)



![image-20210318130507613](https://raw.githubusercontent.com/BearBo666/PicGo/master/img/20210318130507.png)



### 2.2.4 查看自己申请的成果

```
根据哈希表查找技术查找某一学号申请的所有成果及状态,并发往前端。
```



![image-20210318130523740](https://raw.githubusercontent.com/BearBo666/PicGo/master/img/20210318130523.png)



![image-20210318130535796](https://raw.githubusercontent.com/BearBo666/PicGo/master/img/20210318130535.png)



# 三.程序清单

## 3.1 类设计

### 3.1.1 老师设计的成果

```javascript
class Achievement {
    //构造函数
    constructor(id, name, level) {
        //成果的id,主键
        this.id = id
        //成果的名称
        this.name = name
        //成果包含的属性
        this.attribute = []
        //要求学生填写的属性
        this.studentAttr = {}
        //成果级别,0未确定,1国家级,2省级..
        this.level = level ? level : 0
        //录入时间
        this.createdAt = new Date()
    }

    //添加属性
    addAttribute(name, value) {
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
        let text = this.id + '\n' + this.name + '\n' + this.level + '\n' + this.createdAt + '\n'
        //录入属性
        for (let i = 0; i < this.attribute.length; i++) {
            text += this.attribute[i].name + ' ' + this.attribute[i].value + '\n'
        }
        text += '待学生录入：\n'
        //录入学生属性
        const keys = Object.keys(this.studentAttr)
        for (let i = 0; i < keys.length; i++) {
            text += keys[i] + ' ' + this.studentAttr[keys[i]] + '\n'
        }
        text += ' '
        writeFile(AchievePath, text)
    }
}
```



### 3.1.2 学生申请的成果

```javascript
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
        if (this.status == 0) {
            statusTxt = '未审核'
        } else if (this.status == 1) {
            statusTxt = '审核通过'
        } else if (this.status == 2) {
            statusTxt = '审核不通过'
        } else {
            statusTxt = '状态出错'
        }
        console.log(this.status == '0')
        console.log(this.status + statusTxt)
        var text = this.stuNum + '\n' + this.achieveId + '\n' + statusTxt + '\n'
        for (let i = 0; i < this.studentAttr.length; i++) {
            text += this.studentAttr[i].name + ' ' + this.studentAttr[i].value + '\n'
        }
        text += ' '
        writeFile(StudentAchievePath, text)
    }
}
```



<br>



## 3.2 数据结构

### 3.2.1 哈希表 key-value存储

```
此数据结构实现了一个简单的哈希函数，并用拉链法来处理冲突，然后写了若干个方法，如:keys获取所有的键,getAll获取所有的值方便操作。
```



```javascript
class Hash {
    //构造函数
    constructor(size) {
        //定义哈希表大小,未传递参数默认为10
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

    //插入key-value
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
        const length = arrayAtIndex ? arrayAtIndex.length : 0

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

    //得到所有的key
    keys() {
        let keys = []

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
                    keys.push(arrayAtIndex[j][0])
                }
            }
        }

        return keys
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
                //如果等于key值
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

    //更新某key的value值
    update(key, newValue) {
        //获得此key对应的下标
        const index = this.myHashFunction(key, this.storage)

        //得到此下标存放的所有键值对
        let arrayAtIndex = this.storage[index]
        //得到键值对数组的长度
        const length = arrayAtIndex ? arrayAtIndex.length : 0

        //判断此下标有没有存放key
        if (length != 0) {
            for (let i = 0; i < length; i++) {
                let pair = arrayAtIndex[i]
                //如果等于key值
                if (pair[0] == key) {
                    //更新值
                    arrayAtIndex[i][1] = newValue
                    //返回true更新成功
                    return true
                }
            }
            return false
        } else {
            return false
        }
    }
}
```



<br>



### 3.2.2 哈希表 key-field-value存储

```
此数据结构同上面的哈希表，但不过它存储的value变成了一个哈希表，即嵌套了一个哈希表，从而达到了key-field-value形式的存储。
同样也实现了若干方法如fieldSet获得某键的所有field-value对，update更新状态(为了辅导员审核学生申请，从而更新)方便操作。
```



```javascript
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
```



<br>



### 3.2.3 队列

```
此数据结构借用了JavaScript的对象，实现了一些队列的简单操作。
```



```javascript
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
```



<br>



## 3.3 算法

### 3.3.1 快速排序

先根据基准值将数组分为三部分：小于基准值，基准值，大于基准值。

然后对小于(大于）基准值的部分再进行递归快排，并将三部分连接起来。

```javascript
/*
arr：待排序的数组,其中每一项都是一个对象
key：根据对象的此key进行排序
*/

//快速排序
function quickSort(arr, key) {
    if (arr.length <= 1) { return arr; }

    //基准值
    var pivot = arr[0];

    //小于基准值
    var left = [];
    //大于基准值
    var right = [];

    //遍历数组
    for (var i = 1; i < arr.length; i++) {
        //小于基准值推入left,大于基准值推入right
        if (arr[i][key] < pivot[key]) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }

    //连接三个数组
    return quickSort(left, key).concat([pivot], quickSort(right, key))
}
```



<br>



## 3.4 文件存储

### 3.4.1 序列化与反序列化

```
启动项目时，会从文件中读取成果和学生申请的成果，并将其序列化为实例化对象，然后将其存在哈希表中挂载到全局global变量上。

然后前端请求直接在global上操作，不涉及文件，当对成果操作涉及到更新(例如辅导员审核了学生申请，成果状态更新时)，才会对文件内容进行具体更新。
```

![文件](https://raw.githubusercontent.com/BearBo666/PicGo/master/img/20210318184935.jpg)



### 3.4.2 代码实现

文件读写借助了Nodejs中的原生模块fs与readLine

```javascript
const fs = require('fs')
const readLine = require('readline')

//按行读取文件
function readFileToArr(filePath, callback) {
    //创建文件读取流
    let fRead = fs.createReadStream(filePath)

    //创建读取接口
    const objReadLine = readLine.createInterface({
        input: fRead
    })

    //定义数组
    let arr = new Array()
    //监听读取事件
    objReadLine.on('line', function (line) {
        arr.push(line)
    })
    //监听结束事件
    objReadLine.on('close', function () {
        //将数组作为参数执行回调
        callback(arr)
    })
}

//按行写入文件
function writeFile(filePath, data) {
    fs.appendFileSync(filePath, data + '\n')
}
```



# 四.收获与体会

​        在刚开始写课设时，我一直都在想着如何充分体现良好的数据结构，一直在想书上说的“时间复杂度”，“空间复杂度”，一直都想想着如何同时提高二者，所以导致项目结构很难看。之后做不下去后我才醒悟，没有完美的算法，有舍才有得，兼顾时间和空间是不可能的。

​        厘清思路后再做，整个结构条里都清晰多了，而且还使用了版本控制工具git来管理项目，给了我很多试错机会，期间也学到了许多，上课时没掌握好的哈希表，各种排序算法，都熟悉了许多。

​        而且由于是用我最擅长的JavaScript做的，效率也高了许多，所以有了时间写了一个http服务，搭建了一个前端界面。

​        感觉此次课设收获很大，使我感受到了算法和数据结构在底层构建和开发上的重要性，以后还是要多多上手练习。



# 五.参考文献

1. Nodejs 中文文档：http://nodejs.cn/learn
2. Element UI 中文文档：https://element.eleme.cn/#/zh-CN/component/installation
3. 《JavaScript高级程序设计》(第3版)
4. 《数据结构(C语言版)》清华大学出版社 严蔚敏  吴伟民编著

