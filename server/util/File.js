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

module.exports = {
    readFileToArr,
    writeFile
}
